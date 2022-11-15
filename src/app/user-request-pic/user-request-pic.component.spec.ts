import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestPicComponent } from './user-request-pic.component';

describe('UserRequestPicComponent', () => {
  let component: UserRequestPicComponent;
  let fixture: ComponentFixture<UserRequestPicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRequestPicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
