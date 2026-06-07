import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Report03 } from './report03';

describe('Report03', () => {
  let component: Report03;
  let fixture: ComponentFixture<Report03>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Report03],
    }).compileComponents();

    fixture = TestBed.createComponent(Report03);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
