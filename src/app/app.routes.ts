import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    {path: 'login', component: LoginComponent},
    {path: 'register',component: RegisterComponent }
];
