import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.page.html',
  styleUrls: ['./shipment.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonBackButton, CommonModule, FormsModule, HttpClientModule]
})
export class ShipmentPage implements OnInit {

  formulario = {
    ubicacion: '',
    nombre: '',
    apellido: '',
    telefono: '',
    estado: '',
    ciudad: '',
    distrito: '',
    direccion: '',
    formaPago: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  finalizarShipment() {
    const data = {
      accion: 'altaShipment',
      ...this.formulario
    };

    this.http.post('https://funstore/backend/shipment.php', data)
      .subscribe(
        (response: any) => {
          if (response.resultado === 'OK') {
            alert('¡Envío registrado exitosamente!');
            this.limpiarFormulario();
          } else {
            alert('Error al registrar: ' + response.mensaje);
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
          alert('Error de conexión con el servidor.');
        }
      );
  }

  limpiarFormulario() {
    this.formulario = {
      ubicacion: '',
      nombre: '',
      apellido: '',
      telefono: '',
      estado: '',
      ciudad: '',
      distrito: '',
      direccion: '',
      formaPago: ''
    };
  }
  
}
