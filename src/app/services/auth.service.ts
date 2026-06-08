import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Ponemos la URL exacta de tu backend de .NET que comprobamos en Swagger
  private apiUrl = 'https://localhost:7226/api/auth';

  constructor(private http: HttpClient) { }

  // Enviar los datos del Login (Email y Password)
  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciales);
  }

  // Enviar los datos de Registro (Nombre, Email, Password, Rol)
  register(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }
}