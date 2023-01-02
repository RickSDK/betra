import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImageCropComponent } from './upload-image-crop.component';

describe('UploadImageCropComponent', () => {
  let component: UploadImageCropComponent;
  let fixture: ComponentFixture<UploadImageCropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadImageCropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImageCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
