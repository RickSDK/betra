import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetraCommentComponent } from './betra-comment.component';

describe('BetraCommentComponent', () => {
  let component: BetraCommentComponent;
  let fixture: ComponentFixture<BetraCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetraCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetraCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
