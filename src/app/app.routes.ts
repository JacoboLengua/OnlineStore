import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';  // 👈 Importar el  Guard

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.page').then( m => m.ProductsPage) ,
    canActivate: [AuthGuard] //  👈 Aplica el Guard a la Ruta Protegida 
  },
  
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage), 
    canActivate: [AuthGuard] //  👈 Aplica el Guard a la Ruta Protegida 
  },
  {
    path: 'shipment',
    loadComponent: () => import('./pages/shipment/shipment.page').then( m => m.ShipmentPage), 
    canActivate: [AuthGuard] //  👈 Aplica el Guard a la Ruta Protegida 
  },
  {
    path: 'product-detail/:id',//  👈 pasar el parametro /:id 
    loadComponent: () => import('./pages/product-detail/product-detail.page').then( m => m.ProductDetailPage), 
    canActivate: [AuthGuard] //  👈 Aplica el Guard a la Ruta Protegida 
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage), 
    canActivate: [AuthGuard] //  👈 Aplica el Guard a la Ruta Protegida 
  },

 
];
