import { Component, OnInit, AfterViewInit, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { UniversityService } from '../../core/services/university.service';
import { PropertyService } from '../../core/services/property.service';

// OpenLayers Imports
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon, Circle, Fill, Stroke, Text } from 'ol/style';
import Overlay from 'ol/Overlay';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit, AfterViewInit {
  private map: Map | undefined;
  private universityPopup: Overlay | undefined;
  private propertyPopups: Overlay[] = [];

  constructor(
    private universityService: UniversityService,
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Initializing MapComponent...');
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.initMap();
      this.loadUniversities();
      this.loadProperties();
    }, 100);
  }

  private initMap(): void {

    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('Map element not found in the DOM!');
      return;
    }
    
    try {
      this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: fromLonLat([-7.0926, 31.7917]), 
          zoom: 6
        })
      });
      console.log('Map initialized successfully.');
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  private loadUniversities(): void {
    if (!this.map) {
      console.error('Cannot load universities: Map not initialized');
      return;
    }
    
    const universitySource = new VectorSource();
    const universityLayer = new VectorLayer({
      source: universitySource,
      style: new Style({
        image: new Circle({
          radius: 8,
          fill: new Fill({ color: '#4285F4' }),
          stroke: new Stroke({ color: '#fff', width: 2 })
        })
      })
    });

    this.map.addLayer(universityLayer);
    const popupElement = document.createElement('div');
    popupElement.className = 'ol-popup university-popup';
    
    this.universityPopup = new Overlay({
      element: popupElement,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -10],
      autoPan: true
    });
    
    this.map.addOverlay(this.universityPopup);

    this.universityService.getUniversities().subscribe(
      (universities) => {
        console.log('Universities data received:', universities);
        if (universities.length === 0) {
          console.warn('No universities data received');
          return;
        }
        
        universities.forEach(university => {
          if (!university.longitude || !university.latitude) {
            console.warn(`University missing coordinates: ${university.name}`);
            return;
          }
          
          try {
            const coordinates = fromLonLat([university.longitude, university.latitude]);

            
            const feature = new Feature({
              geometry: new Point(coordinates),
              name: university.name,
              city: university.city,
              type: 'university'
            });

            universitySource.addFeature(feature);
  
          } catch (error) {
            console.error(`Error adding university ${university.name}:`, error);
          }
        });
        
   
        universityLayer.changed();
        console.log('All universities added to the map.');
      },
      (error) => {
        console.error('Error fetching universities:', error);
      }
    );
  }

  private loadProperties(): void {
    if (!this.map) {
      console.error('Cannot load properties: Map not initialized');
      return;
    }

    const propertySource = new VectorSource();
    const propertyLayer = new VectorLayer({
      source: propertySource,
      style: new Style({
        image: new Circle({
          radius: 8,
          fill: new Fill({ color: '#DB4437' }),
          stroke: new Stroke({ color: '#fff', width: 2 })
        })
      })
    });

    this.map.addLayer(propertyLayer);
 

    this.propertyService.getProperties().subscribe(
      (properties) => {
      
        if (properties.length === 0) {
          console.warn('No property data received');
          return;
        }
        
        properties.forEach(property => {
          if (!property.longitude || !property.latitude) {
            console.warn(`Property missing coordinates: ${property.title}`);
            return;
          }
          
          try {
            const coordinates = fromLonLat([property.longitude, property.latitude]);
            console.log(`Property coordinates: ${coordinates} for ${property.title}`);
            
            const feature = new Feature({
              geometry: new Point(coordinates),
              title: property.title,
              price: property.price,
              id: property.id,
              type: 'property'
            });

            propertySource.addFeature(feature);
            console.log(`Added property: ${property.title} at ${coordinates}`);
            
          
            this.createPropertyPopup(feature, coordinates);
          } catch (error) {
            console.error(`Error adding property ${property.title}:`, error);
          }
        });
        
        // Force redraw of the layer
        propertyLayer.changed();
        console.log('All properties added to the map.');
      },
      (error) => {
        console.error('Error fetching properties:', error);
      }
    );

    // Add click handler for university features and property navigation
    this.map.on('click', (event) => {
      if (!this.map) return;
      
      const feature = this.map.forEachFeatureAtPixel(event.pixel, (f) => f);
      
      if (feature) {
        const featureType = feature.get('type');
        const coordinates = event.coordinate;
        
        if (featureType === 'university' && this.universityPopup) {
          const element = this.universityPopup.getElement();
          if (element) {
            element.innerHTML = `
              <div class="popup-content">
                <h3>${feature.get('name')}</h3>
              </div>
            `;
            this.universityPopup.setPosition(coordinates);
          }
        } else if (featureType === 'property') {
        
          this.router.navigate(['/properties', feature.get('id')]);
        }
      } else {
        this.universityPopup?.setPosition(undefined);
      }
    });
  }

  private createPropertyPopup(feature: Feature, coordinates: number[]): void {
    if (!this.map) return;
  
  
    const popupElement = document.createElement('div');
    popupElement.className = 'ol-popup property-popup';
    
    popupElement.style.backgroundColor = 'white';
 
    popupElement.style.padding = '15px';
    popupElement.style.borderRadius = '10px';
    popupElement.style.border = '1px solid #cccccc';
    popupElement.style.minWidth = '60px';
    popupElement.style.cursor = 'pointer';
    
    popupElement.innerHTML = `
      <div class="popup-content" style="background-color: white;">
        <p style="margin: 0; color:rgb(6, 6, 6); font-weight: bold; font-size: 16px;">${feature.get('price')}dh</p>
      </div>
    `;
    
    popupElement.addEventListener('click', () => {
      this.router.navigate(['/properties', feature.get('id')]);
    });
    

    const popup = new Overlay({
      element: popupElement,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -10]
    });
    
    popup.setPosition(coordinates);
    this.map.addOverlay(popup);
    this.propertyPopups.push(popup);
  }
}