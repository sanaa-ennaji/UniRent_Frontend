import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { UserRequestDTO } from '../../models/user-request.model';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.userProfileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      password: ['', [Validators.minLength(6), Validators.maxLength(20)]],
    });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userId = user.id;
      if (this.userId !== null) {
        this.userService.getUserById(this.userId).subscribe((data) => {
          this.userProfileForm.patchValue({
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
          });
        });
      } else {
        console.error('User ID is null.');
        this.router.navigate(['/login']);
      }
    } else {
      console.error('User is not logged in.');
      this.router.navigate(['/login']); 
    }
  }
  onSubmit(): void {
    if (this.userProfileForm.valid && this.userId) {
      const userRequestDTO: UserRequestDTO = this.userProfileForm.value;
  
      this.userService.updateUser(this.userId!, userRequestDTO).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          alert('Profile updated successfully!');
        },
        (error) => {
          console.error('Error updating user:', error);
          alert('Error updating profile. Please try again.');
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}