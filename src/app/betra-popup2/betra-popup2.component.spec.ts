import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetraPopup2Component } from './betra-popup2.component';

describe('BetraPopup2Component', () => {
  let component: BetraPopup2Component;
  let fixture: ComponentFixture<BetraPopup2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetraPopup2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetraPopup2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
