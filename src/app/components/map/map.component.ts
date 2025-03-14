import { Component, OnInit  } from '@angular/core';
import { UniversityService } from '../../core/services/university.service';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  private map: any;

  constructor(private universityService: UniversityService) {}

  ngOnInit(): void {
    this.initMap();
    this.loadUniversities();
  }

  private initMap(): void {
    this.map = L.map('map').setView([31.7917, -7.0926], 6); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private loadUniversities(): void {
    this.universityService.getUniversities().subscribe(universities => {
      universities.forEach(university => {
        const marker = L.marker([university.latitude, university.longitude]).addTo(this.map);
        marker.bindPopup(`<b>${university.name}</b><br>${university.city}`);
      });
    });
  }
}