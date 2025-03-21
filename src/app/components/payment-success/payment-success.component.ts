
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [],
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css'],
})
export class PaymentSuccessComponent implements OnInit {
  bookingId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) {
    this.bookingId = +this.route.snapshot.queryParamMap.get('bookingId')!;
  }

  ngOnInit(): void {
    // this.updateBookingStatus();
  }

  // updateBookingStatus(): void {
  //   this.bookingService.updateBookingStatus(this.bookingId, 'DONE').subscribe(
  //     (response) => {
  //       console.log('Booking status updated successfully:', response);
  //       alert('Payment successful! Your booking is confirmed.');
  //       this.router.navigate(['/properties']);
  //     },
  //     (error) => {
  //       console.error('Error updating booking status:', error);
  //       alert('Error updating booking status. Please contact support.');
  //     }
  //   );
  // }
}