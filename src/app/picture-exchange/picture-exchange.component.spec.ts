import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureExchangeComponent } from './picture-exchange.component';

describe('PictureExchangeComponent', () => {
  let component: PictureExchangeComponent;
  let fixture: ComponentFixture<PictureExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureExchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
