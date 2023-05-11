import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoseCeremonyComponent } from './rose-ceremony.component';

describe('RoseCeremonyComponent', () => {
  let component: RoseCeremonyComponent;
  let fixture: ComponentFixture<RoseCeremonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoseCeremonyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoseCeremonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
