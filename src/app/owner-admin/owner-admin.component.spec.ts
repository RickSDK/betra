import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAdminComponent } from './owner-admin.component';

describe('OwnerAdminComponent', () => {
  let component: OwnerAdminComponent;
  let fixture: ComponentFixture<OwnerAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
