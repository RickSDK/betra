import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestDateComponent } from './user-request-date.component';

describe('UserRequestDateComponent', () => {
  let component: UserRequestDateComponent;
  let fixture: ComponentFixture<UserRequestDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRequestDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
