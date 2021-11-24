import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajPreparatComponent } from './dodaj-preparat.component';

describe('DodajPreparatComponent', () => {
  let component: DodajPreparatComponent;
  let fixture: ComponentFixture<DodajPreparatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajPreparatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajPreparatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
