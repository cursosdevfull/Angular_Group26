import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable } from './observable';

describe('Observable', () => {
  let component: Observable;
  let fixture: ComponentFixture<Observable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Observable],
    }).compileComponents();

    fixture = TestBed.createComponent(Observable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
