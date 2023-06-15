import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePic2Component } from './profile-pic2.component';

describe('ProfilePic2Component', () => {
  let component: ProfilePic2Component;
  let fixture: ComponentFixture<ProfilePic2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePic2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePic2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
