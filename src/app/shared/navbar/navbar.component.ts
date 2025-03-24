import { Component } from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBullhorn, faCalendarCheck, faUserCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ThemeToggleComponent, CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isDropdownOpen = false;

  faBullhorn = faBullhorn;
  faCalendarCheck = faCalendarCheck;
  faUserCircle = faUserCircle;
  faPlus = faPlus;

  constructor(
    private authService: AuthService, 
    private router: Router 
  ) {}

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getRoleName(): string | null {
    return this.authService.getRoleName(); 
  }
}