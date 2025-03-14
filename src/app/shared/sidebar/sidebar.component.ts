import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserGraduate, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { NavbarComponent } from "../navbar/navbar.component";
@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule, NavbarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  property = faBuilding;
}
