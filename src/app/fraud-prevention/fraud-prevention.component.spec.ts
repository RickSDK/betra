import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudPreventionComponent } from './fraud-prevention.component';

describe('FraudPreventionComponent', () => {
  let component: FraudPreventionComponent;
  let fixture: ComponentFixture<FraudPreventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FraudPreventionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FraudPreventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
