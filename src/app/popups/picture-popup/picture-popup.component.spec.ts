import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturePopupComponent } from './picture-popup.component';

describe('PicturePopupComponent', () => {
  let component: PicturePopupComponent;
  let fixture: ComponentFixture<PicturePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicturePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
