import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Advice1Component } from './advice1.component';

describe('Advice1Component', () => {
  let component: Advice1Component;
  let fixture: ComponentFixture<Advice1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Advice1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Advice1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
