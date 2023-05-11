import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetraPopupComponent } from './betra-popup.component';

describe('BetraPopupComponent', () => {
  let component: BetraPopupComponent;
  let fixture: ComponentFixture<BetraPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetraPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetraPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
