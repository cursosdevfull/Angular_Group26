import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Report01 } from './report01';

describe('Report01', () => {
  let component: Report01;
  let fixture: ComponentFixture<Report01>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Report01],
    }).compileComponents();

    fixture = TestBed.createComponent(Report01);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
