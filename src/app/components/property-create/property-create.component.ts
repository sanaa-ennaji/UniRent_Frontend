import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PropertyService } from '../../core/services/property.service';
import { PropertyRequest } from '../../models/property.model';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { Navbar2Component } from "../../shared/navbar2/navbar2.component";
import { DataService } from '../../core/services/data.service';
import { AuthService } from '../../core/services/auth.service';
import { CloudinaryService } from '../../core/services/cloudinary.service';

@Component({
  selector: 'app-property-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent, Navbar2Component],
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

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private dataService: DataService,
    private authService: AuthService,
    private cloudinaryService  : CloudinaryService
  )
   {
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
      amenityProperties: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    console.log('Current User:', user); 
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

  addUniversity(university: any): void {
    if (!this.selectedUniversities.includes(university)) {
      this.selectedUniversities.push(university);
      console.log('Selected Universities:', this.selectedUniversities);
      this.propertyForm.patchValue({
        universityIds: this.selectedUniversities.map(u => u.id)
      });
    }
  }
 
  addAmenity(): void {
    const amenitySelect = document.getElementById('amenityProperties') as HTMLSelectElement;
    const selectedOptions = Array.from(amenitySelect.selectedOptions);
  
    this.selectedAmenities = selectedOptions.map((option: HTMLOptionElement) => {
      const amenityId = +option.value; 
      const amenity = this.amenities.find(a => a.id === amenityId);
      if (!amenity) {
        console.error('Amenity not found for ID:', amenityId);
        return null;
      }
      return amenity;
    }).filter(a => a !== null); 
  
    console.log('Selected Amenities:', this.selectedAmenities);
  
    this.propertyForm.patchValue({
      amenityProperties: this.selectedAmenities.map(a => ({
        quantity: 1, 
        amenityId: a.id
      }))
    });
  }



  onFileChange(event: any): void {
    const files = event.target.files;
    if (files) {
      this.selectedFiles = Array.from(files);
    }
  }
  
  onSubmit(): void {
    if (this.propertyForm.valid) {
      console.log('Form Value:', this.propertyForm.value);
      console.log('Selected Amenities:', this.selectedAmenities);
  

      if (!this.selectedAmenities || this.selectedAmenities.length === 0) {
        console.error('No amenities selected.');
        alert('Please select at least one amenity.');
        return;
      }
  
      const uploadObservables = this.selectedFiles.map((file) =>
        this.cloudinaryService.uploadImage(file)
      );
  
      Promise.all(uploadObservables.map((obs) => obs.toPromise()))
        .then((responses) => {
          const imageUrls = responses.map((res) => ({ imageUrl: res.secure_url }));
          console.log('Image URLs:', imageUrls);
  
          this.propertyForm.patchValue({ images: imageUrls });
  
  
          const propertyRequest: PropertyRequest = {
            ...this.propertyForm.value,
            amenityProperties: this.selectedAmenities.map((a) => ({
              quantity: 1,
              amenityId: a.id
            }))
          };
  
          console.log('Property Request:', propertyRequest);
  
       
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