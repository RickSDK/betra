import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersMenuComponent } from './owners-menu.component';

describe('OwnersMenuComponent', () => {
  let component: OwnersMenuComponent;
  let fixture: ComponentFixture<OwnersMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnersMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnersMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
