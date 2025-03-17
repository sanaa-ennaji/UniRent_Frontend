import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:8888/api';

  constructor(private http: HttpClient) {}

  fetchUniversities(): Observable<any> {
    return this.http.get(`${this.baseUrl}/universities`);
  }

  fetchAmenities(): Observable<any> {
    return this.http.get(`${this.baseUrl}/amenity`);
  }
}