import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BibliotecaComponent } from './components/biblioteca.component/biblioteca.component';
import { RegisterComponent } from './components/register.component/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Rutas protegidas:
  { 
    path: 'biblioteca', 
    component: BibliotecaComponent, 
    canActivate: [authGuard], 
    data: { roles: ['Lector', 'Admin'] } // Ambos pueden entrar a ver libros
  },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [authGuard], 
    data: { roles: ['Admin'] } // ¡SOLO el administrador puede entrar aquí!
  },
  { path: '**', redirectTo: 'login' } // Cualquier ruta rara te saca al login
];