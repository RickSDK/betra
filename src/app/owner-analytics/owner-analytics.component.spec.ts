import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAnalyticsComponent } from './owner-analytics.component';

describe('OwnerAnalyticsComponent', () => {
  let component: OwnerAnalyticsComponent;
  let fixture: ComponentFixture<OwnerAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
