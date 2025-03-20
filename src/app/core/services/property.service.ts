import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PropertyRequest, PropertyResponse } from '../../models/property.model';

@Injectable({
  providedIn: 'root'
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
  

}