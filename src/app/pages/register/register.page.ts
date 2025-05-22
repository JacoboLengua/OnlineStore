import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonProgressBar, IonTitle,
  IonToolbar, IonItem, IonButton, IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, IonButtons, IonLabel, IonIcon
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [FormsModule, IonContent ,IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonLabel, IonIcon, IonButton,CommonModule ]
})
export class RegisterPage {

  name: string = '';
  email: string = '';
 password: string = '';
  username: string = '';
  full_name: string = '';

  constructor(
    private registerService: AuthService,
    private router: Router,
    private toastController: ToastController 
  ) {}
  goToLogin() {
    this.router.navigate(['/login']);
  }
  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    await toast.present();
  }
  
  registerUser() {
    if (this.name && this.email && this.password && this.username && this.full_name) {
      console.log('Datos del formulario:', {
        name: this.name,
        email: this.email,
        password: this.password,
        username: this.username,
        full_name: this.full_name
      });
  
      this.registerService.register({
        name: this.name,
        email: this.email,
        password: this.password,
        username: this.username,
        full_name: this.full_name
      }).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
  
          if (response.success === true) {
            this.presentToast('¡Usuario registrado exitosamente!', 'success');
            this.goToLogin();
          } else {
            this.presentToast('Hubo un error: ' + response.message, 'danger');
          }
        },
        error: (err) => {
          console.error('Error en la solicitud:', err);
          this.presentToast('Error de red. Intenta nuevamente.', 'danger');
        }
      });
    } else {
      this.presentToast('Por favor, completa todos los campos.', 'warning');
    }
  }
}