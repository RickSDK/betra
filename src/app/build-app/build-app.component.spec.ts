import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildAppComponent } from './build-app.component';

describe('BuildAppComponent', () => {
  let component: BuildAppComponent;
  let fixture: ComponentFixture<BuildAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
