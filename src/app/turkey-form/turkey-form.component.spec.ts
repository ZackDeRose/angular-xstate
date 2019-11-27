import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurkeyFormComponent } from './turkey-form.component';

describe('TurkeyFormComponent', () => {
  let component: TurkeyFormComponent;
  let fixture: ComponentFixture<TurkeyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurkeyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurkeyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
