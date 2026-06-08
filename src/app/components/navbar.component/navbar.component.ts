import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html', // Revisa si tu archivo se llama navbar.html o navbar.component.html
  styleUrl: './navbar.component.css'      // Revisa si se llama navbar.css o navbar.component.css
})
export class NavbarComponent implements OnInit {
  usuarioActivo: string | null = '';
  rolActivo: string | null = '';
  menuAbierto: boolean = false; // Controla el menú responsive en celulares

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Leemos los datos guardados en el login para pintar el menú de forma dinámica
    this.usuarioActivo = localStorage.getItem('usuario');
    this.rolActivo = localStorage.getItem('rol');
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  onLogout() {
    // Limpieza absoluta de la sesión
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}