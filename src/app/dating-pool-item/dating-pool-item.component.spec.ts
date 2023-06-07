import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatingPoolItemComponent } from './dating-pool-item.component';

describe('DatingPoolItemComponent', () => {
  let component: DatingPoolItemComponent;
  let fixture: ComponentFixture<DatingPoolItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatingPoolItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatingPoolItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
