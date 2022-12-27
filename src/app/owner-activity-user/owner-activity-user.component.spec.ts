import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerActivityUserComponent } from './owner-activity-user.component';

describe('OwnerActivityUserComponent', () => {
  let component: OwnerActivityUserComponent;
  let fixture: ComponentFixture<OwnerActivityUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerActivityUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerActivityUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
