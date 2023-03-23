import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyFeaturesComponent } from './safety-features.component';

describe('SafetyFeaturesComponent', () => {
  let component: SafetyFeaturesComponent;
  let fixture: ComponentFixture<SafetyFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
