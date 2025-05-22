import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonAvatar, IonList, IonItem, IonIcon, IonLabel, IonButton, IonToolbar } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonAvatar, IonList, IonIcon, IonLabel, IonItem, IonButton, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {

  constructor(private router: Router, private alertCtrl: AlertController,private authService: AuthService) { }
  user: any = {};

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
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

  volver() {
    this.router.navigate(['/products']);
  }

}
