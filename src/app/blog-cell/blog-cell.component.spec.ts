import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCellComponent } from './blog-cell.component';

describe('BlogCellComponent', () => {
  let component: BlogCellComponent;
  let fixture: ComponentFixture<BlogCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
