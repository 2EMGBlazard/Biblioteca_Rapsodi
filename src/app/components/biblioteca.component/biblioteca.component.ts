import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { NavbarComponent } from '../navbar.component/navbar.component'; 
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.css'
})
export class BibliotecaComponent implements OnInit {
  libros: any[] = []; 
  mensajeError: string = '';

  mostrarModal: boolean = false;
  libroSeleccionado: any = null;

  numeroNequi: string = '3136151619';
  
  // Formulario ajustado únicamente para dirección y ciudad
  datosCompra = {
    direccion: '',
    ciudad: ''
  };

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.cargarCatalogo();
  }

  cargarCatalogo() {
    this.libroService.getLibros().subscribe({
      next: (data) => {
        this.libros = data;
      },
      error: (err) => {
        this.mensajeError = 'No se pudo cargar el catálogo de libros.';
      }
    });
  }

  onDescargarPDF(libro: any) {
    alert(`📥 [SIMULACIÓN] Descargando el archivo PDF de "${libro.titulo}" de manera gratuita...`);
  }

  onAbrirCompra(libro: any) {
    this.libroSeleccionado = libro;
    this.mostrarModal = true;
  }

  onCerrarModal() {
    this.mostrarModal = false;
    this.libroSeleccionado = null;
    this.datosCompra = { direccion: '', ciudad: '' };
  }

  onEnviarComprobante() {
    if (!this.datosCompra.direccion || !this.datosCompra.ciudad) {
      alert('Por favor, completa tu dirección de residencia y tu ciudad.');
      return;
    }

    // Estructuramos la notificación simulada que consumirá el Dashboard de Administración
    const nuevoPedido = {
      id: Math.floor(1000 + Math.random() * 9000),
      usuario: 'oscar.lector@rapsodi.com',
      libro: this.libroSeleccionado.titulo,
      direccion: `${this.datosCompra.direccion} (${this.datosCompra.ciudad})`,
      comprobante: 'Pago por QR Nequi',
      estado: 'Pendiente de Confirmación'
    };

    const pedidosActuales = JSON.parse(localStorage.getItem('pedidos_simulados') || '[]');
    pedidosActuales.push(nuevoPedido);
    localStorage.setItem('pedidos_simulados', JSON.stringify(pedidosActuales));

    alert(`🎉 ¡Compra reportada exitosamente al Nequi ${this.numeroNequi}!\nTu dirección en ${this.datosCompra.ciudad} fue registrada. El administrador ya recibió la notificación para el despacho.`);
    this.onCerrarModal();
  }

  generarColorDestacado(texto: string): string {
    if (!texto) return '#34495e';
    let hash = 0;
    // CORREGIDO: Cambiado text.length por texto.length para eliminar el error ts(2552)
    for (let i = 0; i < texto.length; i++) {
      hash = texto.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xFF;
      value = Math.floor((value + 100) / 2); 
      color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
  }

  obtenerColorContraste(colorHex: string): string {
    let hex = colorHex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#1a202c' : '#ffffff';
  }
}