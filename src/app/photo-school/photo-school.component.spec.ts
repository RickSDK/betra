import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoSchoolComponent } from './photo-school.component';

describe('PhotoSchoolComponent', () => {
  let component: PhotoSchoolComponent;
  let fixture: ComponentFixture<PhotoSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
