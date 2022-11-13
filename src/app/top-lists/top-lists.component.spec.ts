import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopListsComponent } from './top-lists.component';

describe('TopListsComponent', () => {
  let component: TopListsComponent;
  let fixture: ComponentFixture<TopListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
