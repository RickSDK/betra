import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrivatePicsComponent } from './user-private-pics.component';

describe('UserPrivatePicsComponent', () => {
  let component: UserPrivatePicsComponent;
  let fixture: ComponentFixture<UserPrivatePicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPrivatePicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPrivatePicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
