import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Panel',
      url: '/tabs/main',
      icon: 'home'
    },
    {
      title: 'Productos',
      url: '/tabs/products',
      icon: 'cube'
    },
    {
      title: 'Crear Pedido',
      url: '/tabs/createorder',
      icon: 'cart'
    },
    {
      title: 'Mis Ventas',
      url: '/tabs/createorder',
      icon: 'stats'
    },
    {
      title: 'Clientes',
      url: '/tabs/customerlist',
      icon: 'body'
    },
    {
      title: 'Mis Datos',
      url: '/tabs/createorder',
      icon: 'people'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
