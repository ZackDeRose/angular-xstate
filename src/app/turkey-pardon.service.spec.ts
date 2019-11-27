import { TestBed } from '@angular/core/testing';

import { TurkeyPardonService } from './turkey-pardon.service';

describe('TurkeyPardonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TurkeyPardonService = TestBed.get(TurkeyPardonService);
    expect(service).toBeTruthy();
  });
});
