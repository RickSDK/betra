import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayInputComponent } from './birthday-input.component';

describe('BirthdayInputComponent', () => {
  let component: BirthdayInputComponent;
  let fixture: ComponentFixture<BirthdayInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthdayInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdayInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
