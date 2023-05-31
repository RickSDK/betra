import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameIneverComponent } from './game-inever.component';

describe('GameIneverComponent', () => {
  let component: GameIneverComponent;
  let fixture: ComponentFixture<GameIneverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameIneverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameIneverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
