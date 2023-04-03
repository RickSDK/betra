import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Advice3Component } from './advice3.component';

describe('Advice3Component', () => {
  let component: Advice3Component;
  let fixture: ComponentFixture<Advice3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Advice3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Advice3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
