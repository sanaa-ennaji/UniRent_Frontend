import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Navbar2Component } from './shared/navbar2/navbar2.component';
import { PropertyCreateComponent } from './components/property-create/property-create.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { UserBookingsComponent } from './components/user-bookings/user-bookings.component';
import { LandlordBookingsComponent } from './components/landlord-bookings/landlord-bookings.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MapComponent } from './components/map/map.component';

import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'property/create', component: PropertyCreateComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'LANDLORD' } },
  { path: 'sidebar', component: Navbar2Component },
  { path: 'propertyList', component: PropertyListComponent },
  { path: 'properties/:id', component: PropertyDetailsComponent },
  { path: 'booking/:id', component: BookingFormComponent, canActivate: [AuthGuard] },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'user/booking', component: UserBookingsComponent, canActivate: [AuthGuard] },
  { path: 'landlord/bookings', component: LandlordBookingsComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'LANDLORD' } },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'map', component: MapComponent },
  { path: 'unauthorized', component: UnauthorizedComponent }, 
];