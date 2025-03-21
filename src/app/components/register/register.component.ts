import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { UserRequestDTO } from '../../models/user-request.model';
import { Router, RouterModule } from '@angular/router';
import { faUserGraduate, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  selectedRole: 'student' | 'landlord' = 'student';
  faStudent = faUserGraduate;
  faLandlord = faBuilding;

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', Validators.required],
      roleId: [3, Validators.required], 
    });
  }

  toggleRole(role: 'student' | 'landlord') {
    this.selectedRole = role;
    this.registerForm.patchValue({
      roleId: role === 'student' ? 3 : 2, 
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userRequest: UserRequestDTO = this.registerForm.value;
      console.log('Submitting form:', userRequest); 
      this.userService.registerUser(userRequest).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}