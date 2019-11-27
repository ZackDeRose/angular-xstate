import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurkeyExampleComponent } from './turkey-example.component';

describe('TurkeyExampleComponent', () => {
  let component: TurkeyExampleComponent;
  let fixture: ComponentFixture<TurkeyExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurkeyExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurkeyExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
