import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  imports: [BrowserModule, CommonModule, ReactiveFormsModule],
  standalone: true, 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  userType: "student" | "landlord" = "student";

  constructor(private fb: FormBuilder) {

    this.registrationForm = this.fb.group({
      name: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      roleId: [this.userType === "student" ? 3 : 2],
    });
  }

  ngOnInit(): void {

  }

  toggleUserType(type: "student" | "landlord"): void {
    this.userType = type;
    this.registrationForm.patchValue({
      roleId: type === "student" ? 3 : 2,
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log("Form submitted:", this.registrationForm.value);
    } else {
      Object.keys(this.registrationForm.controls).forEach((key) => {
        this.registrationForm.get(key)?.markAsTouched();
      });
    }
  }
}