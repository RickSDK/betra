import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmirersComponent } from './admirers.component';

describe('AdmirersComponent', () => {
  let component: AdmirersComponent;
  let fixture: ComponentFixture<AdmirersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmirersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmirersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
