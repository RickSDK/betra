import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatingTipsComponent } from './dating-tips.component';

describe('DatingTipsComponent', () => {
  let component: DatingTipsComponent;
  let fixture: ComponentFixture<DatingTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatingTipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatingTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
