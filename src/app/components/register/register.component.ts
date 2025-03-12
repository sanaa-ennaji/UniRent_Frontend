import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserGraduate, faBuilding } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  selectedRole: 'student' | 'landlord' = 'student'; 


  faStudent = faUserGraduate;
  faLandlord = faBuilding;

  toggleRole(role: 'student' | 'landlord') {
    this.selectedRole = role;
  }
}

