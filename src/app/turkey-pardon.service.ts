import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface TurkeyState {
  undecided: string[];
  pardoned: string[];
  eaten: string[];
}

export interface TurkeyDecision {
  pardon: string[];
  eat: string[];
}

const MOCK_LATENCY = 200;

@Injectable({
  providedIn: 'root'
})
export class TurkeyPardonService {
  private _undecided = [
    'Tab the Turkey',
    'Tabar the Turkey',
    'Tabari the Turkey',
    'Tabor the Turkey',
    'Tad the Turkey'
    // 'Tadashi the Turkey',
    // 'Taddeo the Turkey',
    // 'Taden the Turkey',
    // 'Tadeo the Turkey',
    // 'Tadeusz the Turkey',
    // 'Tadhg the Turkey',
    // 'Tafari the Turkey',
    // 'Taffy the Turkey',
    // 'Taft the Turkey',
    // 'Taggart the Turkey',
    // 'Tahmel the Turkey',
    // 'Tahoe the Turkey',
    // 'Tai the Turkey',
    // 'Taiden the Turkey',
    // 'Taio the Turkey',
    // 'Tait the Turkey',
    // 'Taj the Turkey',
    // 'Takaani the Turkey',
    // 'Takeo the Turkey',
    // 'Tal the Turkey',
    // 'Talbot the Turkey',
    // 'Talcott the Turkey',
    // 'Talib the Turkey',
    // 'Taliesin the Turkey',
    // 'Talman the Turkey',
    // 'Tabia the Turkey',
    // 'Tabitha the Turkey',
    // 'Taci the Turkey',
    // 'Tacita the Turkey',
    // 'Tacy the Turkey',
    // 'Tadita the Turkey',
    // 'Taffeta the Turkey',
    // 'Taffy the Turkey',
    // 'Tahani the Turkey',
    // 'Tahira the Turkey',
    // 'Tahirih the Turkey',
    // 'Tahiti the Turkey',
    // 'Tahnee the Turkey',
    // 'Tahoe the Turkey',
    // 'Tai the Turkey'
  ];
  private _pardoned: string[] = [];
  private _eaten: string[] = [];

  fetch(): Observable<TurkeyState> {
    return of({
      undecided: this._undecided,
      pardoned: this._pardoned,
      eaten: this._eaten
    }).pipe(delay(MOCK_LATENCY));
  }

  decide({ eat, pardon }: TurkeyDecision): Observable<TurkeyState> {
    [
      [eat, '_eaten'],
      [pardon, '_pardoned']
    ].forEach(([list, target]: [string[], '_eaten' | '_pardoned']) =>
      list.forEach(turkeyName => {
        const position = this._undecided.indexOf(turkeyName);
        if (position !== -1) {
          this._undecided.splice(position, 1);
          this[target].push(turkeyName);
        }
      })
    );
    return this.fetch();
  }

  nameExists(name: string): Observable<boolean> {
    return of(
      [this._eaten, this._pardoned, this._undecided].some(list =>
        list.some(listItem => listItem === name)
      )
    ).pipe(delay(MOCK_LATENCY));
  }

  add(name: string): Observable<TurkeyState> {
    this._undecided.push(name);
    return this.fetch();
  }
}
