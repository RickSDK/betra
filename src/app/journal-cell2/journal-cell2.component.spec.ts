import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalCell2Component } from './journal-cell2.component';

describe('JournalCell2Component', () => {
  let component: JournalCell2Component;
  let fixture: ComponentFixture<JournalCell2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalCell2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalCell2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
