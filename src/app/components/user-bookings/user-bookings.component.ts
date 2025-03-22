import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../core/services/booking.service';
import { AuthService } from '../../core/services/auth.service';
import { BookingResponseDTO } from '../../models/booking.model';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-bookings',
  standalone:true,
  imports: [NavbarComponent, CommonModule],
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

      this.bookingService.getAllBookings().subscribe(
        (data: BookingResponseDTO[]) => {
          this.bookings = data.filter((booking) => booking.studentId === this.userId);
          console.log('Filtered bookings:', this.bookings);
        },
        (error) => {
          console.error('Error fetching bookings:', error);
        }
      );
    } else {
      console.error('User is not logged in.');
    }
  }
}