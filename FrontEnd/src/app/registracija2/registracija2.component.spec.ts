import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Registracija2Component } from './registracija2.component';

describe('Registracija2Component', () => {
  let component: Registracija2Component;
  let fixture: ComponentFixture<Registracija2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Registracija2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Registracija2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
