import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordBookingsComponent } from './landlord-bookings.component';

describe('LandlordBookingsComponent', () => {
  let component: LandlordBookingsComponent;
  let fixture: ComponentFixture<LandlordBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandlordBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandlordBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
