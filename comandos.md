| comando                                                     | funcion                                                                         |
|-------------------------------------------------------------|---------------------------------------------------------------------------------|
| node -v                                                     | version de node js                                                              |
| npm install -g @angular/cli                                 | Instalar última version de Angular                                              |
| ng version                                                  | verificar version de angular                                                    |
| Set-ExecutionPolicy RemoteSigned -Scope CurrentUser         | Cambia las politicar para ejecutar comandos                                     |
| git init                                                    | Crea una carpeta llamada .git                                                   |
| git add .                                                   | Esto Agrega Archivos a Git                                                      |
| git status                                                  | Varifica el estado de mis archivos                                              |
| git comit -m "Nombre deseado"                               | Esto sella los archivos para enviar                                             |
| git config --global user.name "Tu nuevo Usuario"            | Esto cambia el usuario                                                          |
| git config --global user.email tu correo nuevo              | Esto cambia el correo antiguo por el nuevo                                      |
| git commit --amend --author= "tu nuevo correo"              | Esto cambia el autor de los commit                                              |
| git puss                                                    | Para envisar al repo remoto                                                     |
| ng new mi-primer-angular --standalone --routing --style=css | Crear proyecto                                                                  |
| ng serve -o                                                 | Se conecta a un servidor                                                        |
| ng generate interface models/user.model/user.model          | Generar un modelo                                                               |
| ng g c (ng generate component) view/user.component          | Generar un componente de tipo vista                                             |
| ng g c (ng generate component) view/practica.component      | Tarea para el 11/03/2026                                                        |
| ng generate service services/user.service/user.service      | para crear un servicio                                                          |
| ng generate interceptor interceptors/auth                   | Evita el rebote 401 Unauthorized del JWT                                        |
| ng generate guard guards/auth                               | Evitar que un lector escriba manualmente /admin-dashboard y entre (CanActivate) |
| ng generate component components/navbar.component           | Oculta o muestra los menus segun el usuario                                     |
| ng generate service services/libro                          | Servicio de administrador para el CRUD de los libros                            |
