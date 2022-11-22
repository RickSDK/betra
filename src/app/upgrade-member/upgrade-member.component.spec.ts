import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeMemberComponent } from './upgrade-member.component';

describe('UpgradeMemberComponent', () => {
  let component: UpgradeMemberComponent;
  let fixture: ComponentFixture<UpgradeMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
