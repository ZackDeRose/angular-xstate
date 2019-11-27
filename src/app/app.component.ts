import { Component } from '@angular/core';
import { fetchPeople } from './api';
import { of, from, throwError, Subject, BehaviorSubject } from 'rxjs';
import { tap, catchError, startWith } from 'rxjs/operators';
import { fetchMachine } from './fetchMachine';
import { interpret } from 'xstate';
import { createTurkeyForm } from './turkey-form/turkey-form.component';
import { createTurkeysForm } from './turkeys-form/turkeys-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  service = interpret(
    fetchMachine.withConfig({
      actions: {
        fetchData: (ctx, event) => {
          console.log('fetchData');
          fetchPeople()
            .then(response => response.results)
            .then(
              results => {
                console.log(results);
                this.service.send({ type: 'RESOLVE', results });
              },
              error => {
                console.log(error);
                this.service.send({ type: 'REJECT', message: error });
              }
            );
        }
      }
    })
  ).start();
  fetchState$ = from(this.service).pipe(
    startWith(this.service.initialState),
    tap(x => console.log(x))
  );

  getPeople() {
    this.service.send({ type: 'FETCH' });
  }

  turkeyForm = createTurkeyForm();
  turkeysForm = createTurkeysForm({
    test: 'undecided',
    zack: 'eat',
    isaac: 'pardon'
  });
}
