import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerCellComponent } from './owner-cell.component';

describe('OwnerCellComponent', () => {
  let component: OwnerCellComponent;
  let fixture: ComponentFixture<OwnerCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
