import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { addIcons } from 'ionicons';
import { personCircleOutline, lockClosedOutline } from 'ionicons/icons';

addIcons({
  'person-circle-outline': personCircleOutline,
  'lock-closed-outline': lockClosedOutline
});
import {
  personOutline,
  peopleOutline,
  atOutline,
  mailOutline,
} from 'ionicons/icons';

addIcons({
  'person-outline': personOutline,
  'people-outline': peopleOutline,
  'at-outline': atOutline,
  'mail-outline': mailOutline,
  'lock-closed-outline': lockClosedOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});