import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageLiteComponent } from './landing-page-lite.component';

describe('LandingPageLiteComponent', () => {
  let component: LandingPageLiteComponent;
  let fixture: ComponentFixture<LandingPageLiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageLiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
