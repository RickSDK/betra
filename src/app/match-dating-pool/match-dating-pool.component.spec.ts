import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDatingPoolComponent } from './match-dating-pool.component';

describe('MatchDatingPoolComponent', () => {
  let component: MatchDatingPoolComponent;
  let fixture: ComponentFixture<MatchDatingPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchDatingPoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDatingPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
