import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRequestDTO } from '../../models/user-request.model';
import { UserResponseDTO } from '../../models/user-response.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8888/api/users'; 

  constructor(private http: HttpClient) {}

  registerUser(userRequest: UserRequestDTO): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(this.apiUrl, userRequest);
  }
  updateUser(id: number, userRequestDTO: UserRequestDTO): Observable<UserResponseDTO> {
    return this.http.put<UserResponseDTO>(`${this.apiUrl}/${id}`, userRequestDTO);
  }

  getUserById(id: number): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>(`${this.apiUrl}/${id}`);
  }
}