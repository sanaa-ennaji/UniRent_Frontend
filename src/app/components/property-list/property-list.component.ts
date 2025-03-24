
import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../core/services/property.service';
import { PropertyResponse } from '../../models/property.model';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MapComponent } from '../map/map.component';


@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MapComponent,  FormsModule],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  properties: PropertyResponse[] = [];
  searchTitle: string = '';
  searchPrice: number | null = null;
  searchStartDate: string | null = null;
  constructor(private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.propertyService.getProperties().subscribe((data) => {
      this.properties = data;
      console.log('Properties:', this.properties);
    });
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

  searchProperties(): void {
    const price = this.searchPrice !== null ? this.searchPrice : undefined;
    const startDate = this.searchStartDate ? new Date(this.searchStartDate) : undefined;

    this.propertyService.searchProperties(this.searchTitle, price, startDate).subscribe(
      (data) => {
        this.properties = data;
      },
      (error) => {
        console.error('Error searching properties:', error);
      }
    );
  }
  
}


