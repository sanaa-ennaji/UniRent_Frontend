import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginRequestDTO } from '../../models/login-request.model';
import { AuthenticationResponse } from '../../models/authResponse.model';
import { UserRequestDTO } from '../../models/user-request.model';
import { UserResponseDTO } from '../../models/user-response.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8888/api/authenticate'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: LoginRequestDTO): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.apiUrl, credentials).pipe(
      tap((response) => {
        localStorage.setItem('jwt', response.jwt);
        localStorage.setItem('userId', response.id.toString());
        localStorage.setItem('roleName', response.roleName);
      })
    );
  }


  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('roleName');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

  getJwt(): string | null {
    return localStorage.getItem('jwt');
  }

  getRoleName(): string | null {
    return localStorage.getItem('roleName');
  }
 
  getCurrentUser(): any {
    const userId = localStorage.getItem('userId');
    const roleName = localStorage.getItem('roleName');
  
    if (userId && roleName) {
      return {
        id: +userId, 
        roleName: roleName
      };
    }
    return null;
  }


  
}