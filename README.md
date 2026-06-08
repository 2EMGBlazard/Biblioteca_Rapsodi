# 📚 Rapsodi - Catálogo de Libros y Tienda Digital

Proyecto Final desarrollado para la asignatura **Programación Web 2** del Departamento de Ingeniería de Sistemas. Consiste en una plataforma web que integra un catálogo general de libros, descargas digitales y una simulación interactiva de compra de libros en formato físico con notificaciones en tiempo real al panel de administración.

---

## 🚀 Características Principales & Criterios de Evaluación

### Funcionalidades Obligatorias
* **Login y Registro Completo:** Endpoints funcionales con validaciones rigurosas que retornan un JSON Web Token (JWT) tras una autenticación exitosa.
* **CRUD del Dominio:** Gestión completa (Create, Read, Update, Delete) de la entidad **Libros** persistida en base de datos PostgreSQL.
* **Integración Front-Back:** Aplicación SPA en Angular consumiendo servicios de la API REST en .NET con inyección automática de tokens mediante interceptores HTTP y protección por Guards.
* **Calidad de UX/UI:** Interfaz navegable y limpia con controles de mensajes de error comprensibles, diseño adaptativo de portadas con contraste armónico automático y ventanas emergentes fluidas.

### 🌟 Puntos Extra Implementados (Nivel Profesional)
* **Manejo de Roles Diferenciado (+1.0 Pt):** Rutas, vistas y acciones totalmente separadas para el usuario **Lector** (descarga y compra) y el **Administrador** (gestión de inventario y auditoría de pedidos).
* **Manejo de Token Expirado y Logout Limpio (+0.5 Pt):** Control centralizado que detecta respuestas de sesión vencida (`401 Unauthorized`) e implementa borrado de almacenamiento local redireccionando inmediatamente al `/login`.
* **Filtros y Búsqueda en Listados (+0.5 Pt):** Capacidad de filtrado y búsqueda ágil desde la interfaz gráfica del usuario.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** Angular (Componentes Standalone, TypeScript, Componentes Reactivos).
* **Backend:** .NET Core Web API (C#).
* **Base de Datos:** PostgreSQL.
* **Seguridad:** Autenticación basada en JWT (Json Web Token).

---

## 📦 Instrucciones de Instalación y Despliegue

### 1. Requisitos Previos
* Node.js (v18 o superior)
* .NET SDK (v7.0 o superior)
* Servidor PostgreSQL activo

### 2. Configuración del Backend (.NET)
1. Dirígete a la carpeta del backend.
2. Abre el archivo `appsettings.json` y configura tu cadena de conexión a la base de datos PostgreSQL junto con tu clave secreta de firma para JWT:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Host=localhost;Database=rapsodi_db;Username=postgres;Password=TU_CONTRASEÑA"
     },
     "Jwt": {
       "Secret": "EstaEsUnaLlaveSuperSecretaYLargaDeMinimo32Caracteres",
       "DurationInMinutes": 60
     }
   }