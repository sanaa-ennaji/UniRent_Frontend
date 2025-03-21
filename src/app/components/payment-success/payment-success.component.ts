import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css'],
})
export class PaymentSuccessComponent implements OnInit {
  bookingId: string | null = null;
  paymentSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.queryParamMap.get('bookingId');

    if (this.bookingId) {
      this.updateBookingStatus(this.bookingId);
    }
  }

  updateBookingStatus(bookingId: string): void {
    this.bookingService.updateBookingStatus(+bookingId, 'CONFIRMED').subscribe(
      (response) => {
        console.log('Booking status updated to CONFIRMED:', response);
        this.paymentSuccess = true;
      },
      (error) => {
        console.error('Error updating booking status:', error);
        this.paymentSuccess = false;
      }
    );
  }
}