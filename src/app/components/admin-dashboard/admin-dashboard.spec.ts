import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard'; // <-- Asegura que use el nombre de la clase real
import { LibroService } from '../../services/libro.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  // Creamos un simulador falso del Servicio para que el test no intente conectarse al backend real de C#
  const libroServiceMock = {
    getLibros: () => of([
      { id: 1, titulo: 'Libro de Prueba 1', autor: 'Autor 1', isbn: '1234', disponible: true },
      { id: 2, titulo: 'Libro de Prueba 2', autor: 'Autor 2', isbn: '5678', disponible: false }
    ]),
    crearLibro: (libro: any) => of({ mensaje: 'Creado' }),
    actualizarLibro: (id: number, libro: any) => of({ mensaje: 'Actualizado' }),
    eliminarLibro: (id: number) => of({ mensaje: 'Eliminado' })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Importamos el componente Standalone
      imports: [AdminDashboardComponent],
      // Proveemos los mocks y herramientas HTTP/Rutas que necesita para vivir aislado
      providers: [
        { provide: LibroService, useValue: libroServiceMock },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]) // Evita fallos si la Navbar usa routerLink
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ejecuta el ciclo de vida inicial (como el ngOnInit)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load books on init', () => {
    // Verifica que al arrancar el componente, la lista de libros deje de estar vacía
    expect(component.libros.length).toBe(2);
    expect(component.libros[0].titulo).toBe('Libro de Prueba 1');
  });
});