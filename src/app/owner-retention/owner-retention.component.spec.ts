import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerRetentionComponent } from './owner-retention.component';

describe('OwnerRetentionComponent', () => {
  let component: OwnerRetentionComponent;
  let fixture: ComponentFixture<OwnerRetentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerRetentionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerRetentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
