import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrisiKorisnikaComponent } from './obrisi-korisnika.component';

describe('ObrisiKorisnikaComponent', () => {
  let component: ObrisiKorisnikaComponent;
  let fixture: ComponentFixture<ObrisiKorisnikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObrisiKorisnikaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObrisiKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
