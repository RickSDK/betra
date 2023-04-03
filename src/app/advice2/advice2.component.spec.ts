import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Advice2Component } from './advice2.component';

describe('Advice2Component', () => {
  let component: Advice2Component;
  let fixture: ComponentFixture<Advice2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Advice2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Advice2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
