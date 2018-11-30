import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home';
import { LoginComponent } from './pages/login';
import { BookingComponent } from './pages/booking';
import { NoContentComponent } from './pages/no-content';
import { AuthGuard } from './guards';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard]},
  { path: '**',    component: NoContentComponent },
];
