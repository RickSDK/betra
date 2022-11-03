import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommunicationComponent } from './user-communication.component';

describe('UserCommunicationComponent', () => {
  let component: UserCommunicationComponent;
  let fixture: ComponentFixture<UserCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCommunicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
