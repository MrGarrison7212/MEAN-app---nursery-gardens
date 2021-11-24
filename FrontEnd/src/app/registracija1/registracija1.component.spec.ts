import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Registracija1Component } from './registracija1.component';

describe('Registracija1Component', () => {
  let component: Registracija1Component;
  let fixture: ComponentFixture<Registracija1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Registracija1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Registracija1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
