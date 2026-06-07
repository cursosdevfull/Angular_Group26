import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Report02 } from './report02';

describe('Report02', () => {
  let component: Report02;
  let fixture: ComponentFixture<Report02>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Report02],
    }).compileComponents();

    fixture = TestBed.createComponent(Report02);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
