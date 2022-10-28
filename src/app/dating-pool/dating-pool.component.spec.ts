import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatingPoolComponent } from './dating-pool.component';

describe('DatingPoolComponent', () => {
  let component: DatingPoolComponent;
  let fixture: ComponentFixture<DatingPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatingPoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatingPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
