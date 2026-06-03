import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Comp02 } from './comp02';

describe('Comp02', () => {
  let component: Comp02;
  let fixture: ComponentFixture<Comp02>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comp02],
    }).compileComponents();

    fixture = TestBed.createComponent(Comp02);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
