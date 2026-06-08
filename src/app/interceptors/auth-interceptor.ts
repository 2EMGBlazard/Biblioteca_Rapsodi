import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Intentamos sacar el token guardado en el login
  const token = localStorage.getItem('token');

  // 2. Si el token existe, clonamos la petición y le clavamos la cabecera "Authorization"
  if (token) {
    const clonada = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonada);
  }

  // 3. Si no hay token (como en el login o registro), la petición sigue normal
  return next(req);
};