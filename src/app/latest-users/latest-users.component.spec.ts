import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestUsersComponent } from './latest-users.component';

describe('LatestUsersComponent', () => {
  let component: LatestUsersComponent;
  let fixture: ComponentFixture<LatestUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
