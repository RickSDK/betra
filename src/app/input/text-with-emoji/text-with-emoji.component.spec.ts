import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWithEmojiComponent } from './text-with-emoji.component';

describe('TextWithEmojiComponent', () => {
  let component: TextWithEmojiComponent;
  let fixture: ComponentFixture<TextWithEmojiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextWithEmojiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextWithEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
