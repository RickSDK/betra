import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerStatsComponent } from './owner-stats.component';

describe('OwnerStatsComponent', () => {
  let component: OwnerStatsComponent;
  let fixture: ComponentFixture<OwnerStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
