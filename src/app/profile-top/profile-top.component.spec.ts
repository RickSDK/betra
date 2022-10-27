import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTopComponent } from './profile-top.component';

describe('ProfileTopComponent', () => {
  let component: ProfileTopComponent;
  let fixture: ComponentFixture<ProfileTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
