import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseSinglesComponent } from './browse-singles.component';

describe('BrowseSinglesComponent', () => {
  let component: BrowseSinglesComponent;
  let fixture: ComponentFixture<BrowseSinglesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseSinglesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseSinglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
