import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { PropertyService } from '../../core/services/property.service';
import { DataService } from '../../core/services/data.service';
import { AuthService } from '../../core/services/auth.service';
import { CloudinaryService } from '../../core/services/cloudinary.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { Navbar2Component } from "../../shared/navbar2/navbar2.component";
import { UserPropertiesComponent } from "../user-properties/user-properties.component";
import { ReactiveFormsModule } from '@angular/forms';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon } from 'ol/style';


@Component({
  selector: 'app-property-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent, Navbar2Component, UserPropertiesComponent],
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.css']
})
export class PropertyCreateComponent implements OnInit, AfterViewInit {
  propertyForm: FormGroup;
  universities: any[] = [];
  amenities: any[] = [];
  selectedFiles: File[] = [];
  selectedUniversities: any[] = [];
  selectedAmenities: any[] = [];
  private isBrowser: boolean;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private dataService: DataService,
    private authService: AuthService,
    private cloudinaryService: CloudinaryService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      address: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      available: [true],
      description: [''],
      type: [''],
      landlordId: [null, Validators.required],
      universityIds: [[], Validators.required],
      images: [[]],
      amenityIds: [[], Validators.required],
      personNumbers: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      startDate: [null, [Validators.required, this.futureOrPresentValidator]],
      latitude: [null],
      longitude: [null]
    });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.propertyForm.patchValue({ landlordId: user.id });
    }

    this.fetchUniversities();
    this.fetchAmenities();
  }

  fetchUniversities(): void {
    this.dataService.fetchUniversities().subscribe(
      (data: any) => {
        this.universities = data;
      },
      (error) => {
        console.error('Error fetching universities:', error);
      }
    );
  }

  fetchAmenities(): void {
    this.dataService.fetchAmenities().subscribe(
      (data: any) => {
        this.amenities = data;
      },
      (error) => {
        console.error('Error fetching amenities:', error);
      }
    );
  }

  addUniversity(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const universityId = +selectElement.value;

    if (universityId && !this.selectedUniversities.some(u => u.id === universityId)) {
      const university = this.universities.find(u => u.id === universityId);
      if (university) {
        this.selectedUniversities.push(university);
        this.propertyForm.patchValue({
          universityIds: this.selectedUniversities.map(u => u.id),
        });
        selectElement.value = '';
      }
    }
  }

  removeUniversity(university: any): void {
    this.selectedUniversities = this.selectedUniversities.filter(u => u.id !== university.id);
    this.propertyForm.patchValue({
      universityIds: this.selectedUniversities.map(u => u.id),
    });
  }

  onAmenityChange(event: Event, amenity: any): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedAmenities.push(amenity);
    } else {
      this.selectedAmenities = this.selectedAmenities.filter(a => a.id !== amenity.id);
    }
    this.propertyForm.patchValue({
      amenityIds: this.selectedAmenities.map(a => a.id),
    });
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFiles = [
        ...this.selectedFiles,
        ...Array.from(inputElement.files)
      ];
    }
  }

  removeFile(index: number): void {
    this.selectedFiles = [
      ...this.selectedFiles.slice(0, index),
      ...this.selectedFiles.slice(index + 1)
    ];
  }

  futureOrPresentValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return { futureOrPresent: true };
    }
    return null;
  }

  getControl(controlName: string): AbstractControl | null {
    return this.propertyForm.get(controlName);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      const map = new Map({
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

      let marker: Feature | null = null;

      map.on('click', (event: any) => {
        const coordinate = event.coordinate;
        const lonLat = fromLonLat(coordinate);

        this.propertyForm.patchValue({
          latitude: lonLat[1],
          longitude: lonLat[0]
        });

        if (marker) {
          marker.setGeometry(new Point(coordinate));
        } else {
          marker = new Feature({
            geometry: new Point(coordinate)
          });

          const vectorLayer = new VectorLayer({
            source: new VectorSource({
              features: [marker]
            }),
            style: new Style({
              image: new Icon({
                src: 'https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.5/theme/default/img/marker.png',
                scale: 1
              })
            })
          });

          map.addLayer(vectorLayer);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.propertyForm.valid) {
      const uploadObservables = this.selectedFiles.map((file) =>
        this.cloudinaryService.uploadImage(file)
      );

      Promise.all(uploadObservables.map((obs) => obs.toPromise()))
        .then((responses) => {
          const imageUrls = responses.map((res) => ({ imageUrl: res.secure_url }));
          this.propertyForm.patchValue({ images: imageUrls });

          const propertyRequest = {
            ...this.propertyForm.value,
            amenityIds: this.selectedAmenities.map(a => a.id),
          };

          this.propertyService.createProperty(propertyRequest).subscribe(
            (response) => {
              console.log('Property created successfully:', response);
              alert('Property created successfully!');
            },
            (error) => {
              console.error('Error creating property:', error);
              alert('Error creating property. Please try again.');
            }
          );
        })
        .catch((error) => {
          console.error('Error uploading images:', error);
          alert('Error uploading images. Please try again.');
        });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}