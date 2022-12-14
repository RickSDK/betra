import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersTableCellComponent } from './owners-table-cell.component';

describe('OwnersTableCellComponent', () => {
  let component: OwnersTableCellComponent;
  let fixture: ComponentFixture<OwnersTableCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnersTableCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnersTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
