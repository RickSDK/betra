import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWithEnterComponent } from './text-with-enter.component';

describe('TextWithEnterComponent', () => {
  let component: TextWithEnterComponent;
  let fixture: ComponentFixture<TextWithEnterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextWithEnterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextWithEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
