import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html', // Revisa si se llama register.html o register.component.html
  styleUrl: './register.component.css'      // Revisa si se llama register.css o register.component.css
})
export class RegisterComponent {
  // Objeto con los mismos nombres que espera el DTO de .NET
  nuevoUsuario = {
    nombre: '',
    email: '',
    password: '',
    rol: 'Lector' // Por defecto se registran como lectores comunes
  };

  errorMensaje: string = '';
  exitoMensaje: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.errorMensaje = '';
    this.exitoMensaje = '';

    // Llamamos al servicio conectado con el Backend
    this.authService.register(this.nuevoUsuario).subscribe({
      next: (response) => {
        // Mensaje de feedback exitoso (Requerimiento de la rúbrica)
        this.exitoMensaje = '¡Registro exitoso! Redirigiendo al login...';
        
        // Esperamos 2 segundos para que el usuario lea el mensaje y lo mandamos al Login
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error en el registro', err);
        // Manejo de errores dinámico (Requerimientos 400, 401 de la rúbrica)
        if (err.status === 400 && err.error?.errors?.Password) {
          this.errorMensaje = 'La contraseña debe tener un mínimo de 6 caracteres.';
        } else if (err.status === 400) {
          this.errorMensaje = err.error || 'El correo electrónico ya está registrado.';
        } else {
          this.errorMensaje = 'Ocurrió un error en el servidor. Inténtalo más tarde.';
        }
      }
    });
  }
}