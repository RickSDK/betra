import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchSnapshotComponent } from './match-snapshot.component';

describe('MatchSnapshotComponent', () => {
  let component: MatchSnapshotComponent;
  let fixture: ComponentFixture<MatchSnapshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchSnapshotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
