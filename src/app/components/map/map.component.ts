import { Component, OnInit, Input } from '@angular/core';
import { UniversityService } from '../../core/services/university.service';
import { PropertyService } from '../../core/services/property.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map: any;
  private L: any; 
  @Input() properties: any[] = []; 

  constructor(
    private universityService: UniversityService,
    private propertyService: PropertyService,
    private router: Router
  ) {}
  async ngOnInit(): Promise<void> {
    if (typeof window !== 'undefined') { 
      const L = await import('leaflet'); 
      this.L = L;
      this.initMap();
      this.loadUniversities();
    }
    
  }

  private initMap(): void {
    this.map = this.L.map('map').setView([31.7917, -7.0926], 6);

    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private loadUniversities(): void {
    const iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
    const iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';
    const shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';
  
    const customIcon = this.L.icon({
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
        const marker = this.L.marker([university.latitude, university.longitude], { icon: customIcon }).addTo(this.map);
        marker.bindPopup(`<b>${university.name}</b><br>${university.city}`);
      });
    });
  }
  
  private loadProperties(): void {
    const iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
    const iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';
    const shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';

    const customIcon = this.L.icon({
      iconUrl: iconUrl,
      iconRetinaUrl: iconRetinaUrl,
      shadowUrl: shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

  
    this.properties.forEach(property => {
      const marker = this.L.marker([property.latitude, property.longitude], { icon: customIcon }).addTo(this.map);

  
      marker.bindPopup(`<b>${property.title}</b><br>Price: $${property.price}`);
      marker.on('click', () => {
        this.router.navigate(['/properties', property.id]);
      });
    });
  }
}
  
