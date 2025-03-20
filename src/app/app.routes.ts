import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Navbar2Component } from './shared/navbar2/navbar2.component';
import { PropertyCreateComponent } from './components/property-create/property-create.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    {path: 'login', component: LoginComponent},
    {path: 'register',component: RegisterComponent },
    {path: 'property/create' , component: PropertyCreateComponent},
    {path: 'sidebar' , component : Navbar2Component },
    {path: 'propertyList', component: PropertyListComponent},
    { path: 'properties/:id', component: PropertyDetailsComponent }

];
