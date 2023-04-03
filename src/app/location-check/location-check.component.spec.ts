import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCheckComponent } from './location-check.component';

describe('LocationCheckComponent', () => {
  let component: LocationCheckComponent;
  let fixture: ComponentFixture<LocationCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
