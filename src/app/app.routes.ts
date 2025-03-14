import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MapComponent } from './components/map/map.component';
import { CreatePropertyComponent } from './components/landLord/create-property/create-property.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    {path: 'login', component: LoginComponent},
    {path: 'register',component: RegisterComponent },
    {path: 'landlord/property/create' , component: CreatePropertyComponent}
];
