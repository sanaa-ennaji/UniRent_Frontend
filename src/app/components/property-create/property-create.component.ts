import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { PropertyService } from '../../core/services/property.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { Navbar2Component } from "../../shared/navbar2/navbar2.component";
import { DataService } from '../../core/services/data.service';
import { AuthService } from '../../core/services/auth.service';
import { CloudinaryService } from '../../core/services/cloudinary.service';
import { UserPropertiesComponent } from "../user-properties/user-properties.component";
import { isPlatformBrowser } from '@angular/common';
declare var google: any;
@Component({
  selector: 'app-property-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent, Navbar2Component, UserPropertiesComponent],
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.css']
})
export class PropertyCreateComponent implements OnInit {
  propertyForm: FormGroup;
  universities: any[] = [];
  amenities: any[] = [];
  selectedFiles: File[] = [];
  selectedUniversities: any[] = [];
  selectedAmenities: any[] = [];
  private isBrowser: boolean;
  private map: any;
  private marker: any;

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

  
  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initMap();
    }
  }
  private initMap(): void {
    const mapOptions = {
      center: { lat: 31.7917, lng: -7.0926 }, 
      zoom: 6 
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);


    this.map.addListener('click', (event: any) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      this.propertyForm.patchValue({
        latitude: lat,
        longitude: lng
      });

      if (!this.marker) {
        this.marker = new google.maps.Marker({
          position: { lat, lng },
          map: this.map
        });
      } else {
        this.marker.setPosition({ lat, lng });
      }
    });
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