
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';
import { AuthService } from '../../core/services/auth.service';
import { PaymentService } from '../../core/services/payment.service';
import { BookingRequestDTO } from '../../models/booking.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;
  propertyId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private authService: AuthService,
    private paymentService: PaymentService
  ) {
    this.bookingForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['Male', Validators.required],
    });

    this.propertyId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    if (this.bookingForm.valid) {
      const user = this.authService.getCurrentUser();
      if (!user) {
        alert('You must be logged in to make a booking.');
        this.router.navigate(['/login']);
        return;
      }

      const bookingRequest: BookingRequestDTO = {
        ...this.bookingForm.value,
        propertyId: this.propertyId,
        studentId: user.id,
        status: 'PENDING',
      };

      try {
        const bookingResponse = await this.bookingService.createBooking(bookingRequest).toPromise();
        console.log('Booking created successfully:', bookingResponse);

        const price = bookingResponse.price;

        const sessionId = await this.paymentService.createCheckoutSession(price, 'MAD', bookingResponse.id);

        await this.paymentService.redirectToCheckout(sessionId);
      } catch (error) {
        console.error('Error creating booking or redirecting to payment:', error);
        alert('Error creating booking or redirecting to payment. Please try again.');
      }
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}