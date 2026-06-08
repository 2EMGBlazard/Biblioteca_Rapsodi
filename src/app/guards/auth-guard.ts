import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const rolUsuario = localStorage.getItem('rol');

  // 1. ¿Está logueado? Si no, patitas a la calle (al login)
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // 2. Validación de Roles (RoleGuard integrado)
  // Comprobamos si la ruta del archivo app.routes.ts exige un rol específico
  const rolesEsperados = route.data['roles'] as Array<string>;
  
  if (rolesEsperados && !rolesEsperados.includes(rolUsuario || '')) {
    alert('No tienes permisos (Rol requerido) para ver esta página.');
    
    // Si es un lector perdido, lo devolvemos a su biblioteca
    if (rolUsuario === 'Lector') {
      router.navigate(['/biblioteca']);
    } else {
      router.navigate(['/login']);
    }
    return false;
  }

  return true; // Acceso concedido
};