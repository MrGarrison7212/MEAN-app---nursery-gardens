import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajRasadnikComponent } from './dodaj-rasadnik.component';

describe('DodajRasadnikComponent', () => {
  let component: DodajRasadnikComponent;
  let fixture: ComponentFixture<DodajRasadnikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajRasadnikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajRasadnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
