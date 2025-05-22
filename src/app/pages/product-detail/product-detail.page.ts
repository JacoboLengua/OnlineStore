import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,
  IonButtons, IonThumbnail, IonLabel, IonItem, IonList, IonIcon,
  IonText, IonGrid, IonRow, IonCol, IonButton, IonFab, IonFabButton,
  IonSpinner, IonCardContent, IonCardTitle, IonCardHeader, IonImg, IonCard, IonCardSubtitle
} from '@ionic/angular/standalone';

import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [
    IonSpinner, CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,
    IonButtons, IonThumbnail, IonLabel, IonItem, IonList, IonIcon,
    IonText, IonGrid, IonRow, IonCol, IonButton, IonFab, IonFabButton,
    IonCardContent, IonCardTitle, IonCardHeader, IonImg, IonCard, IonCardSubtitle
  ]
})
export class ProductDetailPage implements OnInit {

  product: any = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productsService: AuthService,
    private router: Router
  ) {}

  goToShipment() {
    this.router.navigate(['/shipment']);
  }


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(parseInt(id));
    } else {
      this.errorMessage = 'ID de producto no válido';
      this.isLoading = false;
    }
  }
  ionViewWillLeave() {
    const focusedElement = document.activeElement as HTMLElement | null;
    if (focusedElement) {
      focusedElement.blur();  // quita el foco del elemento enfocado
    }
  }
  loadProduct(id: number) {
    this.isLoading = true;
    this.errorMessage = '';
    this.productsService.getProductById(id).subscribe({
      next: (response: any) => {
        console.log('Respuesta cruda:', response);
        // Prueba esta asignación directa
        if (response) {
          this.product = response.producto ? response.producto : response;
        } else {
          this.errorMessage = 'Producto no encontrado';
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar el producto';
        console.error('Error al obtener producto:', error);
        this.isLoading = false;
      }
    });
  }
}  