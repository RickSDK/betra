import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceCellComponent } from './advice-cell.component';

describe('AdviceCellComponent', () => {
  let component: AdviceCellComponent;
  let fixture: ComponentFixture<AdviceCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviceCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviceCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
