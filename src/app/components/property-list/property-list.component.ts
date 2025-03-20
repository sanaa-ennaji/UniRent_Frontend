
import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../core/services/property.service';
import { PropertyResponse } from '../../models/property.model';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Navbar3Component } from '../../shared/navbar3/navbar3.component';
import { MapComponent } from "../map/map.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent, Navbar3Component, MapComponent],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  properties: PropertyResponse[] = [];

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
}


