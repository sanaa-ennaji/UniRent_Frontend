import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../core/services/booking.service';
import { AuthService } from '../../core/services/auth.service';
import { BookingResponseDTO } from '../../models/booking.model';
import { Navbar3Component } from "../../shared/navbar3/navbar3.component";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-bookings',
  standalone:true,
  imports: [Navbar3Component, NavbarComponent, CommonModule],
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css'],
 
})
export class UserBookingsComponent implements OnInit {
  bookings: BookingResponseDTO[] = [];
  userId: number | null = null;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userId = user.id;
  
      if (this.userId !== null) {
        this.bookingService.getBookingsByUserId(this.userId).subscribe(
          (data: BookingResponseDTO[]) => {
            this.bookings = data;
            console.log('Bookings fetched successfully:', this.bookings);
          },
          (error) => {
            console.error('Error fetching bookings:', error);
          }
        );
      } else {
        console.error('User ID is null.');
      }
    } else {
      console.error('User is not logged in.');
    }
  }
}