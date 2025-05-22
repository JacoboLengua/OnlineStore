import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonProgressBar, IonIcon, IonTitle, IonToolbar, IonItem, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';
import { NavController } from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';



@Component({

  selector: 'app-login',

  templateUrl: './login.page.html',

  styleUrls: ['./login.page.scss'],

  standalone: true,

  imports: [IonContent, IonHeader, IonIcon, IonProgressBar, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput]

})

export class LoginPage implements OnInit {





  // variable para controlar la visibilidad del loader 

  isLoading: boolean = true;





  username: string = ''; // Declara e inicializa la propiedad username 

  password: string = ''; // Declara e inicializa la propiedad password 



  constructor(private authService: AuthService, private router: Router, private navCtrl: NavController, private toastController: ToastController) { }



  async ngOnInit() {



    // Espera 3 segundos para simular la carga de datos 

    await new Promise(resolve => setTimeout(resolve, 3000));



    // Cuando termina la carga , oculta la barra de progreso 

    this.isLoading = false;

  } async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger',
      position: 'top'
    });
    toast.present();
  }



  onLogin() {
    console.log("ok entra");

    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);

        if (response.success) { // Verifica si el login fue exitoso 
          console.log('Inicio de sesión exitoso');

          // Guarda los datos del usuario en LocalStorage 
          localStorage.setItem('currentUser', JSON.stringify(response.user));

          this.navCtrl.navigateForward('/products', {
            animationDirection: 'forward'
          }); // Navegación optimizada para Ionic 

        } else {
          console.log('Credenciales incorrectas');
          this.presentToast('Usuario o contraseña incorrectos');
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        this.presentToast('Ocurrió un error al intentar iniciar sesión');
      }
    );
  }



  onRegister() {
    console.log("Navegar a registro");
    this.navCtrl.navigateForward('/register', {
      animationDirection: 'forward'
    });
  }





}