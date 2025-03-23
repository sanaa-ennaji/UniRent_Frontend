import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any = null; 

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  
    this.user = this.authService.getCurrentUser();
    if (!this.user) {
      console.error('User is not logged in.');
   
    }
  }
}