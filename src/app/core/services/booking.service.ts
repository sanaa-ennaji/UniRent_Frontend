import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingRequestDTO, BookingResponseDTO } from '../../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:8888/api/v1/booking';

  constructor(private http: HttpClient) {}

  createBooking(bookingRequest: BookingRequestDTO): Observable<any> {
    return this.http.post(this.apiUrl, bookingRequest);
  }
  updateBookingStatus(bookingId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${bookingId}/status`, null, {
      params: { status },
    });
  }

  getBookingsByUserId(userId: number): Observable<BookingResponseDTO[]> {
    return this.http.get<BookingResponseDTO[]>(`${this.apiUrl}/user/${userId}`);
  }
}
