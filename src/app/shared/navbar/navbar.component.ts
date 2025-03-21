import { Component } from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBullhorn, faCalendarCheck, faUserCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  standalone: true ,
  imports: [ThemeToggleComponent, CommonModule,  RouterModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
 
})
export class NavbarComponent {
  isDropdownOpen = false ; 
  
  faBullhorn = faBullhorn;
  faCalendarCheck = faCalendarCheck;
  faUserCircle = faUserCircle;
  faPlus = faPlus;

  toggleDropdown() : void {
    this.isDropdownOpen = !this.isDropdownOpen ; 
  }

  // constructor(private authService: AuthService, private router: Router) {}
  //  logout(): void {
  //   this.authService.logout();
  //   this.router.navigate(['/login']);
  //   this.isDropdownOpen = false; 
  // }
}
