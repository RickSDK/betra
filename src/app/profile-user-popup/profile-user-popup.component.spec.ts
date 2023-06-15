import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserPopupComponent } from './profile-user-popup.component';

describe('ProfileUserPopupComponent', () => {
  let component: ProfileUserPopupComponent;
  let fixture: ComponentFixture<ProfileUserPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUserPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
