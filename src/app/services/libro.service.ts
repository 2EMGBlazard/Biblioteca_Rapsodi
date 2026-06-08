import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  // Ponemos el puerto exacto de tu backend en Community
  private apiUrl = 'https://localhost:7226/api/libros';

  constructor(private http: HttpClient) {}

  // Obtener todos los libros
  getLibros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear un libro nuevo
  crearLibro(libro: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, libro);
  }

  // Eliminar un libro por ID
  eliminarLibro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un libro existente por su ID
  actualizarLibro(id: number, libro: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, libro);
  }
}
