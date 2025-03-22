import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../core/services/property.service';
import { AuthService } from '../../core/services/auth.service';
import { PropertyResponse } from '../../models/property.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisVertical, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-user-properties',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './user-properties.component.html',
  styleUrls: ['./user-properties.component.css'],
})
export class UserPropertiesComponent implements OnInit {
  properties: PropertyResponse[] = [];
  userId: number | null = null;
  openDropdownId: number | null = null; 

  faEllipsisVertical = faEllipsisVertical;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  constructor(
    private propertyService: PropertyService,
    private authService: AuthService,
    private router: Router,
    private library: FaIconLibrary
  ) {   library.addIcons(faEllipsisVertical, faPenToSquare, faTrash);
  }
  ngOnInit(): void {
    this.fetchProperties();
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

  fetchProperties(): void {
    this.propertyService.getProperties().subscribe(
      (data: PropertyResponse[]) => {
        this.properties = data;
        console.log('Properties fetched successfully:', this.properties);
      },
      (error) => {
        console.error('Error fetching properties:', error);
      }
    );
  }


  
  toggleDropdown(propertyId: number): void {
    this.openDropdownId = this.openDropdownId === propertyId ? null : propertyId;
  }

  isDropdownOpen(propertyId: number): boolean {
    return this.openDropdownId === propertyId;
  }

  onUpdate(propertyId: number): void {
    console.log('Update property with ID:', propertyId);
    this.router.navigate(['/properties', propertyId, 'edit']);
    this.openDropdownId = null; 
  }

  onDelete(propertyId: number): void {
    console.log('Delete property with ID:', propertyId);
    this.propertyService.deleteProperty(propertyId).subscribe(
      () => {
        console.log('Property deleted successfully');
        this.fetchProperties();
      },
      (error) => {
        console.error('Error deleting property:', error);
      }
    );
    this.openDropdownId = null; 
  }
}


