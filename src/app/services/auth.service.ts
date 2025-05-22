import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({

  providedIn: 'root'

})

export class AuthService {


  url = 'http://localhost/funstore/backend/crud.php';
  url2 = 'http://localhost/funstore/backend/register.php';
  url3 =  'http://localhost/funstore/backend/shipment.php';

  private currentPage = 0;

  private pageSize = 10;


  constructor(private http: HttpClient) { }


  login(username: string, password: string) {

    return this.http.post(`${this.url}`, { accion: 'login', username, password });

  }
  /** 

   * Recupera los productos del backend usando paginación. 

   * @param page Número de página que se quiere cargar (por defecto 0). 

   * @param limit Cantidad de productos por página (por defecto 10). 

   * 

   * Esta función hace una petición POST al backend, enviando la acción 'listarProductos' 

   * junto con la página y el límite que se desea obtener. 

   */

  recuperarTodos(page: number = 0, limit: number = this.pageSize) {

    return this.http.post(`${this.url}`, {

      accion: 'listarProductos', // Acción que debe procesar el backend 

      pagina: page,              // Página solicitada 

      limite: limit              // Número de productos por página 

    });

  }



  /** 

   * Incrementa la página actual y llama a `recuperarTodos` para obtener más productos. 

   * 

   * Esta función es utilizada por el scroll infinito para cargar más datos cada vez 

   * que el usuario llega al final de la lista. 

   */

  loadMore() {

    this.currentPage++;                   // Aumenta el número de página actual 

    return this.recuperarTodos(this.currentPage); // Llama a recuperarTodos con la nueva página 

  }

  // Mètodo para obtener un producto por id 

  getProductById(id: number) {
    return this.http.post(`${this.url}`, {
      accion: 'obtenerProducto',
      id: id
    });

  }

  // Método para registrar un nuevo usuario
  register(userData: {
    name: string;
    email: string;
    password: string;
    username: string;
    full_name: string;
  }): Observable<any> {
    const payload = {
      accion: 'register',
      ...userData
    };

    return this.http.post<any>(this.url2, payload);
  }
 
  // 🚀 Nuevo método para crear un shipment
 createShipment(shipmentData: {
  ubicacion: string;
  nombre: string;
  apellido: string;
  telefono: string;
  estado: string;
  ciudad: string;
  distrito: string;
  direccion: string;
  formaPago: string;
}): Observable<any> {
  const payload = {
    accion: 'altaShipment',
    ...shipmentData
  };
  return this.http.post<any>(this.url3, payload);
}
getCurrentUser() {
  const userJson = localStorage.getItem('user');
  if (userJson) {
    return JSON.parse(userJson);
  }
  return null;
}

} 

