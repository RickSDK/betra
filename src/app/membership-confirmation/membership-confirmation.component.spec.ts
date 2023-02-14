import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipConfirmationComponent } from './membership-confirmation.component';

describe('MembershipConfirmationComponent', () => {
  let component: MembershipConfirmationComponent;
  let fixture: ComponentFixture<MembershipConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
