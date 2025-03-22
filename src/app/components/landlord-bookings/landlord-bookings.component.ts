import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../core/services/booking.service';
import { AuthService } from '../../core/services/auth.service';
import { BookingResponseDTO } from '../../models/booking.model';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landlord-bookings',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './landlord-bookings.component.html',
  styleUrls: ['./landlord-bookings.component.css']

})
export class LandlordBookingsComponent implements OnInit {
  bookings: BookingResponseDTO[] = [];
  landlordId: number | null = null;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get the authenticated landlord's ID
    const user = this.authService.getCurrentUser();
    if (user) {
      this.landlordId = user.id;
  

      if (this.landlordId !== null) {
        this.bookingService.getConfirmedBookingsByLandlordId(this.landlordId).subscribe(
          (data: BookingResponseDTO[]) => {
            this.bookings = data;
            console.log('Confirmed bookings fetched successfully:', this.bookings);
          },
          (error) => {
            console.error('Error fetching confirmed bookings:', error);
          }
        );
      } else {
        console.error('Landlord ID is null.');
      }
    } else {
      console.error('User is not logged in.');
    }
  }
}