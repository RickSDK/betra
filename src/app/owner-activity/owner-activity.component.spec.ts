import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerActivityComponent } from './owner-activity.component';

describe('OwnerActivityComponent', () => {
  let component: OwnerActivityComponent;
  let fixture: ComponentFixture<OwnerActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
