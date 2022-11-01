import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentTextComponent } from './percent-text.component';

describe('PercentTextComponent', () => {
  let component: PercentTextComponent;
  let fixture: ComponentFixture<PercentTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercentTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
