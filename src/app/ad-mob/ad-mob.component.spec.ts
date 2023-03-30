import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdMobComponent } from './ad-mob.component';

describe('AdMobComponent', () => {
  let component: AdMobComponent;
  let fixture: ComponentFixture<AdMobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdMobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdMobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
