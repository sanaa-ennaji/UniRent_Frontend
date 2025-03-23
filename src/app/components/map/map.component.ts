import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../../core/services/university.service';
import * as L from 'leaflet'; 

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
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
    const iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
    const iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';
    const shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';

    const customIcon = L.icon({
      iconUrl: iconUrl,
      iconRetinaUrl: iconRetinaUrl,
      shadowUrl: shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.universityService.getUniversities().subscribe(universities => {
      universities.forEach(university => {
        const marker = L.marker([university.latitude, university.longitude], { icon: customIcon }).addTo(this.map);
        marker.bindPopup(`<b>${university.name}</b><br>${university.city}`);
      });
    });
  }
}