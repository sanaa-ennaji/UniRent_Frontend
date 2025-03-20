import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';
import { AuthService } from '../../core/services/auth.service';
import { BookingRequestDTO } from '../../models/booking.model';

@Component({
  selector: 'app-booking-form',
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
    private authService: AuthService
  ) {
    this.bookingForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.propertyId = +this.route.snapshot.paramMap.get('id')!;
  }

  onSubmit(): void {
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
  
      this.bookingService.createBooking(bookingRequest).subscribe(
        (response) => {
          console.log('Booking created successfully:', response);
          alert('Booking created successfully!');
          this.router.navigate(['/properties']);
        },
        (error) => {
          console.error('Error creating booking:', error);
          alert('Error creating booking. Please try again.');
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}