import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { PropertyService } from '../../core/services/property.service';
import { PropertyRequest, ImageRequest, AmenityPropertyRequest } from '../../models/property.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.css']
})
export class PropertyCreateComponent implements OnInit {
  propertyForm!: FormGroup;

  constructor(private fb: FormBuilder, private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      address: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      available: [true],
      description: [''],
      type: [''],
      landlordId: [null, Validators.required],
      universityIds: this.fb.array([]),
      images: this.fb.array([]),
      amenityProperties: this.fb.array([])
    });
  }

  get universityIds(): FormArray {
    return this.propertyForm.get('universityIds') as FormArray;
  }

  get images(): FormArray {
    return this.propertyForm.get('images') as FormArray;
  }

  get amenityProperties(): FormArray {
    return this.propertyForm.get('amenityProperties') as FormArray;
  }

  addUniversityId(): void {
    this.universityIds.push(this.fb.control(null, Validators.required));
  }

  addImage(): void {
    this.images.push(this.fb.group({
      imageUrl: ['', Validators.required]
    }));
  }

  addAmenityProperty(): void {
    this.amenityProperties.push(this.fb.group({
      quantity: [0, [Validators.required, Validators.min(0)]],
      amenityId: [null, Validators.required]
    }));
  }

  removeUniversityId(index: number): void {
    this.universityIds.removeAt(index);
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  removeAmenityProperty(index: number): void {
    this.amenityProperties.removeAt(index);
  }

  onSubmit(): void {
    if (this.propertyForm.valid) {
      const propertyRequest: PropertyRequest = this.propertyForm.value;
      this.propertyService.createProperty(propertyRequest).subscribe(
        response => {
          console.log('Property created successfully:', response);
          alert('Property created successfully!');
        },
        error => {
          console.error('Error creating property:', error);
          alert('Error creating property. Please try again.');
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}