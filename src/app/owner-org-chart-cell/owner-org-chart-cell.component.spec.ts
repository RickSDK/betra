import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerOrgChartCellComponent } from './owner-org-chart-cell.component';

describe('OwnerOrgChartCellComponent', () => {
  let component: OwnerOrgChartCellComponent;
  let fixture: ComponentFixture<OwnerOrgChartCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerOrgChartCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerOrgChartCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
