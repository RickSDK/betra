import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPicsComponent } from './verify-pics.component';

describe('VerifyPicsComponent', () => {
  let component: VerifyPicsComponent;
  let fixture: ComponentFixture<VerifyPicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyPicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyPicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
