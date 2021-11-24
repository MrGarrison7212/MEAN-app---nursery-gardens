import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajSadnicuComponent } from './dodaj-sadnicu.component';

describe('DodajSadnicuComponent', () => {
  let component: DodajSadnicuComponent;
  let fixture: ComponentFixture<DodajSadnicuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajSadnicuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajSadnicuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
