import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditPicsComponent } from './profile-edit-pics.component';

describe('ProfileEditPicsComponent', () => {
  let component: ProfileEditPicsComponent;
  let fixture: ComponentFixture<ProfileEditPicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditPicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditPicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
