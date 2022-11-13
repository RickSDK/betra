import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateLocalComponent } from './date-local.component';

describe('DateLocalComponent', () => {
  let component: DateLocalComponent;
  let fixture: ComponentFixture<DateLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
