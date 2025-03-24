import { Component} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequestDTO } from '../../models/login-request.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true ,
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials: LoginRequestDTO  = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.router.navigate(['/propertyList']); 
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid email or password. Please try again.';
        },
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}