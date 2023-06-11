import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoClassComponent } from './photo-class.component';

describe('PhotoClassComponent', () => {
  let component: PhotoClassComponent;
  let fixture: ComponentFixture<PhotoClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
