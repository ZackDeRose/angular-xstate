import { Component, OnInit } from '@angular/core';
import { TurkeyPardonService } from '../turkey-pardon.service';
import { publish, map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { interpret, assign } from 'xstate';
import { turkeyPardonMachine } from '../turkey-pardon.machine';
import { createTurkeysForm } from '../turkeys-form/turkeys-form.component';
import { from } from 'rxjs';

const createFreshMapOfUndecidedTurkeys = (turkeyNames: string[]) =>
  turkeyNames.reduce((acc, turkeyName) => {
    acc[turkeyName] = 'undecided';
    return acc;
  }, {});

@Component({
  selector: 'app-turkey-example',
  templateUrl: './turkey-example.component.html',
  styleUrls: ['./turkey-example.component.css']
})
export class TurkeyExampleComponent implements OnInit {
  form: FormGroup;
  eaten: string[] = [];
  pardoned: string[] = [];
  machineService = interpret(
    turkeyPardonMachine.withConfig({
      actions: {
        loadTurkeyState: (ctx, event) =>
          this._turkeyService.fetch().subscribe(turkeyState => {
            assign(() => turkeyState);
            this.form = new FormGroup({
              turkeys: createTurkeysForm(
                createFreshMapOfUndecidedTurkeys(turkeyState.undecided)
              )
            });
            this.form.valueChanges.subscribe(() =>
              this.machineService.send(
                this.form.valid ? 'FORM_VALID' : 'FORM_INVALID'
              )
            );
            this.machineService.send('LOADED');
          }),
        newTurkeyState: (ctx, event) => {
          this.form
            .get('turkeys')
            .setValue(createFreshMapOfUndecidedTurkeys(event.undecided));
          this.eaten = event.eaten;
          this.pardoned = event.pardoned;
        }
      }
    })
  ).start();
  state$ = from(this.machineService);

  constructor(private _turkeyService: TurkeyPardonService) {
    this.machineService.subscribe(x => console.log(x));
  }

  ngOnInit() {
    this.machineService.send('INITIAL_LOAD');
  }

  formSubmit() {
    const eat = Object.entries(this.form.value.turkeys)
      .filter(([_key, value]) => value === 'eat')
      .map(([key]) => key);
    const pardon = Object.entries(this.form.value.turkeys)
      .filter(([_key, value]) => value === 'pardon')
      .map(([key]) => key);
    console.log(this.form.value, eat, pardon);
    this.machineService.send('SUBMIT');
    this._turkeyService.decide({ eat, pardon }).subscribe(
      turkeyState => this.machineService.send('SUBMIT_SUCCESS', turkeyState),
      error => this.machineService.send('SUBMIT_FAILURE', error),
      () => {}
    );
  }
}
