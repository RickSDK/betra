import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerTeamsComponent } from './owner-teams.component';

describe('OwnerTeamsComponent', () => {
  let component: OwnerTeamsComponent;
  let fixture: ComponentFixture<OwnerTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
