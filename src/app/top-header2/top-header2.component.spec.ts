import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHeader2Component } from './top-header2.component';

describe('TopHeader2Component', () => {
  let component: TopHeader2Component;
  let fixture: ComponentFixture<TopHeader2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopHeader2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopHeader2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
