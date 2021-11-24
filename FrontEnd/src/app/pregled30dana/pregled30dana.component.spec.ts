import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pregled30danaComponent } from './pregled30dana.component';

describe('Pregled30danaComponent', () => {
  let component: Pregled30danaComponent;
  let fixture: ComponentFixture<Pregled30danaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pregled30danaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pregled30danaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
