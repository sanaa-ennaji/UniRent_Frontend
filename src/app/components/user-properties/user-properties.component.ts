import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../core/services/property.service';
import { AuthService } from '../../core/services/auth.service';
import { PropertyResponse } from '../../models/property.model';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Navbar3Component } from '../../shared/navbar3/navbar3.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-properties',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-properties.component.html',
  styleUrls: ['./user-properties.component.css'],
})
export class UserPropertiesComponent implements OnInit {
  properties: PropertyResponse[] = [];
  userId: number | null = null;

  constructor(
    private propertyService: PropertyService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const user = this.authService.getCurrentUser();
    if (user) {
      this.userId = user.id;

  
      this.propertyService.getProperties().subscribe((data) => {
        this.properties = data.filter((property) => property.landlordId === this.userId);
        console.log('User Properties:', this.properties);
      });
    } else {
      console.error('User is not logged in.');
      this.router.navigate(['/login']); 
    }
  }

  navigateToPropertyDetails(propertyId: number) {
    this.router.navigate(['/properties', propertyId]);
  }
}