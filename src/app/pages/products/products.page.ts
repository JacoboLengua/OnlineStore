import { NavController } from '@ionic/angular/standalone';
// Importaciones necesarias de Angular e Ionic 
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Importación de componentes Ionic standalone 

import {

  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonRouterOutlet, IonButtons, IonRefresher, IonMenu, IonRefresherContent, IonIcon, IonSpinner, IonText, IonItem,
  IonLabel, IonList, IonThumbnail, IonInfiniteScroll, IonInfiniteScrollContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent

} from '@ionic/angular/standalone';

import { Router, RouterOutlet } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MenuController } from '@ionic/angular';



// Decorador Componente con su configuración 

@Component({

  selector: 'app-products', // Selector para usar este componente 
  templateUrl: './products.page.html', // Plantilla HTML asociada 
  styleUrls: ['./products.page.scss'], // Estilos SCSS asociados 
  standalone: true, // Indicador que es un componente standalone 
  imports: [ // Todos los componentes/directivas que necesita este componente 

    IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonRouterOutlet, CommonModule, FormsModule, IonButton, IonButtons, IonRefresher, IonRefresherContent,
    IonSpinner, IonText, IonItem, IonLabel, IonList, IonThumbnail, IonInfiniteScroll, IonInfiniteScrollContent, IonCard, IonCardHeader, IonCardTitle,
    IonCardContent, RouterModule

  ]

})

export class ProductsPage implements OnInit {

  // Propiedades de la clase: 



  // Array para almacenar los artículos/productos 

  articulos: any[] = [];



  // Flag para indicar si está cargando datos iniciales 

  isLoading = false;



  // Flag para indicar si está cargando más datos (paginación) 

  isLoadingMore = false;



  // Mensaje de error para mostrar al usuario 

  errorMessage = '';



  // Flag para controlar si hay más datos por cargar 

  hasMoreData = true;





  // Constructor: inyecta el servicio ProductsService 

  constructor(private productoService: AuthService, private navCtrl: NavController, private router: Router, private alertCtrl: AlertController, private menuCtrl: MenuController) { }



  // Método del ciclo de vida: se ejecuta al inicializar el componente 

  ngOnInit() {

    this.cargarArticulos(); // Carga inicial de artículos 

  }



  /** 

   * Método para cargar los artículos iniciales 

   * - Reinicia los estados de carga 

   * - Hace la petición al servicio 

   * - Maneja la respuesta y los errores 

   */

  cargarArticulos() {

    this.isLoading = true; // Activa flag de carga 

    this.errorMessage = ''; // Limpia mensajes de error previos 

    this.articulos = []; // Vacía el array de artículos 

    this.hasMoreData = true; // Asume que hay más datos por cargar 



    // Llama al servicio para obtener los artículos 

    this.productoService.recuperarTodos().subscribe({

      next: (result: any) => {

        // Si la respuesta es un array, lo asigna, sino array vacío 

        this.articulos = Array.isArray(result) ? result : [];

        this.isLoading = false; // Desactiva flag de carga 



        // Determina si hay más datos (si la respuesta no está vacía) 

        this.hasMoreData = result.length > 0;

      },

      error: (error) => {

        this.errorMessage = 'Error al cargar los productos'; // Mensaje de error 

        this.isLoading = false; // Desactiva flag de carga 

        console.error("Error al recuperar los datos", error); // Log del error 

      }

    });

  }



  /** 

   * Método para cargar más artículos (paginación) 

   * @param event Evento del infinite-scroll 

   */

  cargarMasArticulos(event: any) {

    // Si no hay más datos, deshabilita el infinite-scroll y retorna 

    if (!this.hasMoreData) {

      event.target.disabled = true;

      return;

    }



    this.isLoadingMore = true; // Activa flag de carga adicional 



    // Llama al servicio para cargar más artículos 

    this.productoService.loadMore().subscribe({

      next: (result: any) => {

        // Procesa los nuevos artículos 

        const nuevosArticulos = Array.isArray(result) ? result : [];



        // Concatena los nuevos artículos con los existentes 

        this.articulos = [...this.articulos, ...nuevosArticulos];



        // Determina si hay más datos por cargar 

        this.hasMoreData = nuevosArticulos.length > 0;

        this.isLoadingMore = false; // Desactiva flag de carga 



        // Completa el evento del infinite-scroll 

        event.target.complete();



        // Si no hay más datos, deshabilita el infinite-scroll 

        if (!this.hasMoreData) {

          event.target.disabled = true;

        }

      },

      error: (error) => {

        console.error("Error al cargar más artículos", error);

        this.isLoadingMore = false; // Desactiva flag de carga 

        event.target.complete(); // Completa el evento aunque haya error 

      }

    });

  }



  /** 

   * Método para refrescar/recargar los artículos 

   * @param event Evento del ion-refresher 

   */

  refrescarArticulos(event: any) {

    this.cargarArticulos(); // Vuelve a cargar los artículos 

    event.target.complete(); // Completa el evento de refresco 

  }

  openMenu() {
    this.menuCtrl.open('first'); // 'first' es el id del menú, ajusta si tienes otro
  }





  verDetalleProducto(id: number) {


    this.navCtrl.navigateForward(`product-detail/${id}`, {
      animationDirection: 'forward'
    });
    // Navegación optimizada para Ionic 





  }
  comprarProducto(articulo: any) {


    console.log('Producto comprado:', articulo)
    // Aquí podrías hacer navegación, mostrar modal de pago, etc.

    this.navCtrl.navigateForward(['/product-detail', articulo.id], {
      animationDirection: 'forward'
    });
  }
  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Cerrar sesión',
          handler: () => {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

  lastScrollTop = 0;

  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    const toolbar = document.getElementById('toolbar');

    if (!toolbar) return;

    if (scrollTop > this.lastScrollTop) {
      // Bajando: ocultar toolbar
      toolbar.style.display = 'none';
    } else {
      // Subiendo: mostrar toolbar
      toolbar.style.display = 'flex'; // o 'block' si no usas flex
    }

    this.lastScrollTop = scrollTop;
  }


}