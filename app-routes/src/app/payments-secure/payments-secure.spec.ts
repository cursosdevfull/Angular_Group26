import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsSecure } from './payments-secure';

describe('PaymentsSecure', () => {
  let component: PaymentsSecure;
  let fixture: ComponentFixture<PaymentsSecure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsSecure],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentsSecure);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
