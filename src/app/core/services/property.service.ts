import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PropertyRequest, PropertyResponse } from '../../models/property.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private apiUrl = 'http://localhost:8888/api/properties';

  constructor(private http: HttpClient) {}

  getProperties(): Observable<PropertyResponse[]> {
    return this.http.get<PropertyResponse[]>(this.apiUrl);
  }

  createProperty(propertyRequest: PropertyRequest): Observable<any> {
    return this.http.post(this.apiUrl, propertyRequest);
  }

  getPropertyById(id: number): Observable<PropertyResponse> {
    return this.http.get<PropertyResponse>(`${this.apiUrl}/${id}`);
  }

  updateProperty(id: number, propertyRequest: PropertyRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, propertyRequest);
  }

  deleteProperty(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  searchProperties(title?: string, price?: number, startDate?: Date): Observable<PropertyResponse[]> {
    const params = new HttpParams()
      .set('title', title || '')
      .set('price', price ? price.toString() : '')
      .set('startDate', startDate ? startDate.toISOString() : '');

    return this.http.get<PropertyResponse[]>(`${this.apiUrl}/search`, { params });
  }
}