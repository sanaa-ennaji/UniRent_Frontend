import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { University } from '../../models/university.model';

@Injectable({
  providedIn: 'root',
})
export class UniversityService {
  private apiUrl = 'http://localhost:8888/api/universities'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getUniversities(): Observable<University[]> {
    return this.http.get<University[]>(this.apiUrl);
  }
}