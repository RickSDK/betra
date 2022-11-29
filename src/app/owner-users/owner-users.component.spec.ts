import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerUsersComponent } from './owner-users.component';

describe('OwnerUsersComponent', () => {
  let component: OwnerUsersComponent;
  let fixture: ComponentFixture<OwnerUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
