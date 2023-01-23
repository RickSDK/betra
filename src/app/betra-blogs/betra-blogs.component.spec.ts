import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetraBlogsComponent } from './betra-blogs.component';

describe('BetraBlogsComponent', () => {
  let component: BetraBlogsComponent;
  let fixture: ComponentFixture<BetraBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetraBlogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetraBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
