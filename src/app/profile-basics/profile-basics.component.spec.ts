import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBasicsComponent } from './profile-basics.component';

describe('ProfileBasicsComponent', () => {
  let component: ProfileBasicsComponent;
  let fixture: ComponentFixture<ProfileBasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileBasicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
