import { Component } from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true ,
  imports: [ThemeToggleComponent, CommonModule,  RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
 
})
export class NavbarComponent {
  

}
