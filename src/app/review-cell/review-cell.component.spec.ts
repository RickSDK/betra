import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCellComponent } from './review-cell.component';

describe('ReviewCellComponent', () => {
  let component: ReviewCellComponent;
  let fixture: ComponentFixture<ReviewCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
