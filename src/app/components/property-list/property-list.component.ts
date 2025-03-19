
import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../core/services/property.service';
import { PropertyResponse } from '../../models/property.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  properties: PropertyResponse[] = [];

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.fetchProperties();
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