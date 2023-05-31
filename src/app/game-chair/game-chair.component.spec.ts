import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameChairComponent } from './game-chair.component';

describe('GameChairComponent', () => {
  let component: GameChairComponent;
  let fixture: ComponentFixture<GameChairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameChairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameChairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
