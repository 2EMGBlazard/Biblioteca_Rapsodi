import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar.component/navbar.component';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboardComponent implements OnInit {
  libros: any[] = [];
  pedidosSimulados: any[] = []; // Arreglo en memoria para capturar las compras de los lectores

  nuevoLibro = {
    titulo: '',
    autor: '',
    isbn: '',
    disponible: true,
  };

  editando: boolean = false;
  libroIdParaEditar: number | null = null;

  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.cargarLibros();
    this.cargarPedidosNotificaciones(); // Carga las alertas de compra al iniciar el panel
  }

  cargarLibros() {
    this.libroService.getLibros().subscribe({
      next: (data) => {
        this.libros = data;
      },
      error: (err) => {
        this.manejarErroresHttp(err, 'Error al cargar los libros.');
      },
    });
  }

  // Carga e inicializa la simulación de pedidos locales enviados desde la biblioteca
  cargarPedidosNotificaciones() {
    const guardados = localStorage.getItem('pedidos_simulados');
    if (guardados) {
      this.pedidosSimulados = JSON.parse(guardados);
    } else {
      // Pedido de demostración inicial por defecto si la lista local está limpia
      this.pedidosSimulados = [
        { 
          id: 1042, 
          usuario: 'carlos@ucaldas.com', 
          libro: 'Las Memorias De Sherlock Holmes', 
          direccion: 'Carrera 23 #45-12, Manizales', 
          comprobante: 'Ref: NQ-992183', 
          estado: 'Pendiente de Confirmación' 
        }
      ];
      localStorage.setItem('pedidos_simulados', JSON.stringify(this.pedidosSimulados));
    }
  }

  // Acción interactiva para que el administrador confirme el pago y simule la logística
  onDespacharPedido(idPedido: number) {
    this.pedidosSimulados = this.pedidosSimulados.map(pedido => {
      if (pedido.id === idPedido) {
        pedido.estado = 'Despachado / Enviado';
      }
      return pedido;
    });
    
    // Sincroniza el cambio de estado en el almacenamiento local
    localStorage.setItem('pedidos_simulados', JSON.stringify(this.pedidosSimulados));
    alert('🚚 ¡Pedido Confirmado! Se ha verificado la transferencia a tu Nequi. El estado de la orden pasó a "Despachado / Enviado".');
  }

  onGuardarLibro() {
    this.mensajeExito = '';
    this.mensajeError = '';

    if (this.editando && this.libroIdParaEditar !== null) {
      this.libroService.actualizarLibro(this.libroIdParaEditar, this.nuevoLibro).subscribe({
        next: (res) => {
          this.mensajeExito = '¡Libro actualizado exitosamente!';
          this.cargarLibros();
          this.limpiarFormulario();
        },
        error: (err) => this.manejarErroresHttp(err, 'No se pudo actualizar el libro.')
      });
    } else {
      this.libroService.crearLibro(this.nuevoLibro).subscribe({
        next: (res) => {
          this.mensajeExito = '¡Libro creado exitosamente!';
          this.cargarLibros();
          this.limpiarFormulario();
        },
        error: (err) => this.manejarErroresHttp(err, 'No se pudo crear el libro.')
      });
    }
  }

  seleccionarParaEditar(libro: any) {
    this.editando = true;
    this.libroIdParaEditar = libro.id;
    
    this.nuevoLibro = {
      titulo: libro.titulo,
      autor: libro.autor,
      isbn: libro.isbn,
      disponible: libro.disponible,
    };
  }

  limpiarFormulario() {
    this.editando = false;
    this.libroIdParaEditar = null;
    this.nuevoLibro = { titulo: '', autor: '', isbn: '', disponible: true };
  }

  onEliminarLibro(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este libro?')) return;

    this.mensajeExito = '';
    this.mensajeError = '';

    this.libroService.eliminarLibro(id).subscribe({
      next: (res) => {
        this.mensajeExito = 'Libro eliminado de la base de datos correctamente.';
        this.cargarLibros();
        if (this.libroIdParaEditar === id) this.limpiarFormulario();
      },
      error: (err) => this.manejarErroresHttp(err, 'No tienes permisos o el libro no existe.')
    });
  }

  private manejarErroresHttp(err: any, mensajePorDefecto: string) {
    console.error(err);
    if (err.status === 400) {
      this.mensajeError = 'Petición incorrecta (400): Valida los campos ingresados.';
    } else if (err.status === 401) {
      this.mensajeError = 'No autenticado (401): Sesión vencida, por favor reingresa.';
    } else if (err.status === 403) {
      this.mensajeError = 'Acceso denegado (403): Tu rol no tiene permisos para esta acción.';
    } else if (err.status === 404) {
      this.mensajeError = 'No encontrado (404): El recurso solicitado no existe.';
    } else {
      this.mensajeError = mensajePorDefecto;
    }
  }
}