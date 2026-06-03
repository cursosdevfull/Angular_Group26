import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Comp01 } from './comp01';

describe('Comp01', () => {
  let component: Comp01;
  let fixture: ComponentFixture<Comp01>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comp01],
    }).compileComponents();

    fixture = TestBed.createComponent(Comp01);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
