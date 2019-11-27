import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  FormGroup
} from '@angular/forms';
import { createTurkeyForm } from '../turkey-form/turkey-form.component';
import { Subject, Observable } from 'rxjs';
import { takeUntil, tap, startWith, map } from 'rxjs/operators';

export interface TurkeysFormModel {
  [turkeyName: string]: 'undecided' | 'eat' | 'pardon';
}

export const createTurkeysForm = (model: TurkeysFormModel) =>
  new FormControl(model, form =>
    Object.values(form.value as TurkeysFormModel).some(
      turkey => turkey !== 'undecided'
    )
      ? null
      : { 'no changes': true }
  );

@Component({
  selector: 'app-turkeys-form',
  templateUrl: './turkeys-form.component.html',
  styleUrls: ['./turkeys-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TurkeysFormComponent,
      multi: true
    }
  ]
})
export class TurkeysFormComponent implements ControlValueAccessor, OnDestroy {
  form: FormGroup;
  names$: Observable<string[]>;
  private _destroying$ = new Subject<void>();

  writeValue(obj: TurkeysFormModel) {
    if (this.form) {
      const combinedKeys = Object.keys({ ...obj, ...this.form.value });
      combinedKeys.forEach(key => {
        if (obj[key] && this.form.value[key]) {
          this.form.get(key).setValue(obj.key);
        } else if (obj[key]) {
          this.form.addControl(key, createTurkeyForm(obj[key]));
        } else {
          this.form.removeControl(key);
        }
      });
    } else {
      this.form = new FormGroup(
        Object.keys(obj).reduce((acc, key) => {
          acc[key] = createTurkeyForm(obj[key]);
          return acc;
        }, {})
      );
      this.names$ = this.form.valueChanges.pipe(
        startWith(this.form.value),
        map(nameMap => Object.keys(nameMap))
      );
    }
  }

  registerOnChange(fn) {
    this.form.valueChanges
      .pipe(takeUntil(this._destroying$), tap(fn))
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
