import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerBugsComponent } from './owner-bugs.component';

describe('OwnerBugsComponent', () => {
  let component: OwnerBugsComponent;
  let fixture: ComponentFixture<OwnerBugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerBugsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerBugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
