import { Component, OnDestroy, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormControl
} from '@angular/forms';
import { Subject } from 'rxjs';
import { tap, takeUntil, startWith, map } from 'rxjs/operators';

export type TurkeyStatus = 'undecided' | 'eat' | 'pardon';

export const createTurkeyForm = (initialStatus: TurkeyStatus = 'undecided') =>
  new FormControl(initialStatus);

@Component({
  selector: 'app-turkey-form',
  templateUrl: './turkey-form.component.html',
  styleUrls: ['./turkey-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TurkeyFormComponent,
      multi: true
    }
  ]
})
export class TurkeyFormComponent implements ControlValueAccessor, OnDestroy {
  static COUNT = 0;
  @Input() name: string;
  form: FormGroup;
  id = ++TurkeyFormComponent.COUNT;
  private _destroying$ = new Subject<void>();

  writeValue(status: TurkeyStatus): void {
    if (this.form) {
      this.form.setValue({
        eat: status === 'eat',
        pardon: status === 'pardon'
      });
    } else {
      this.form = new FormGroup({
        eat: new FormControl(status === 'eat'),
        pardon: new FormControl(status === 'pardon')
      });
      this.form.valueChanges
        .pipe(
          takeUntil(this._destroying$),
          startWith(this.form.value),
          tap(({ eat, pardon }: { eat: boolean; pardon: boolean }) => {
            console.log(eat, pardon);
            if (!eat && !pardon) {
              this.form.get('eat').enable({ emitEvent: false });
              this.form.get('pardon').enable({ emitEvent: false });
            } else if (eat && !pardon) {
              this.form.get('eat').enable({ emitEvent: false });
              this.form.get('pardon').disable({ emitEvent: false });
            } else if (!eat && pardon) {
              this.form.get('eat').disable({ emitEvent: false });
              this.form.get('pardon').enable({ emitEvent: false });
            }
          })
        )
        .subscribe();
    }
  }

  registerOnChange(fn) {
    this.form.valueChanges
      .pipe(
        takeUntil(this._destroying$),
        map(({ eat, pardon }: { eat: boolean; pardon: boolean }) =>
          eat ? 'eat' : pardon ? 'pardon' : 'undecided'
        ),
        tap(fn)
      )
      .subscribe();
  }

  registerOnTouched(fn) {}

  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  ngOnDestroy() {
    this._destroying$.next();
  }
}
