import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetraFeaturesComponent } from './betra-features.component';

describe('BetraFeaturesComponent', () => {
  let component: BetraFeaturesComponent;
  let fixture: ComponentFixture<BetraFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetraFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetraFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
