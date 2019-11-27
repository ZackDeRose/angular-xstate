import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurkeysFormComponent } from './turkeys-form.component';

describe('TurkeysFormComponent', () => {
  let component: TurkeysFormComponent;
  let fixture: ComponentFixture<TurkeysFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurkeysFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurkeysFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
