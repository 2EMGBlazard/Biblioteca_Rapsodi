import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router'; // <-- NUEVO: Obligatorio para usar routerLink
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // <-- NUEVO: Agregado RouterModule aquí
  templateUrl: './login.component.html', // Verifica que coincida con tu archivo físico
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credenciales = { email: '', password: '' };
  errorMensaje: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.errorMensaje = '';

    this.authService.login(this.credenciales).subscribe({
      next: (response) => {
        console.log('¡Login exitoso!', response);
        
        // Guardamos los datos de sesión en el navegador
        localStorage.setItem('token', response.token);
        localStorage.setItem('usuario', response.usuario);
        localStorage.setItem('rol', response.rol);

        alert(`¡Bienvenido, ${response.usuario}!`);

        // Evaluamos el rol para decidir a qué pantalla mandarlo:
        if (response.rol === 'Admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/biblioteca']);
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMensaje = 'Correo o contraseña incorrectos.';
        } else {
          this.errorMensaje = 'Error al conectar con el servidor.';
        }
      }
    });
  }

  // Dejamos lista la función para el botón de Google
  loginConGoogle() {
    console.log('Iniciando flujo con Google...');
    // Próximamente pondremos la lógica aquí
  }
}