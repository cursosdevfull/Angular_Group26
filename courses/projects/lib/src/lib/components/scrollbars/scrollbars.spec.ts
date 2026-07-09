import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scrollbars } from './scrollbars';

describe('Scrollbars', () => {
  let component: Scrollbars;
  let fixture: ComponentFixture<Scrollbars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scrollbars],
    }).compileComponents();

    fixture = TestBed.createComponent(Scrollbars);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
