import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerProcessCcComponent } from './owner-process-cc.component';

describe('OwnerProcessCcComponent', () => {
  let component: OwnerProcessCcComponent;
  let fixture: ComponentFixture<OwnerProcessCcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerProcessCcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerProcessCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
