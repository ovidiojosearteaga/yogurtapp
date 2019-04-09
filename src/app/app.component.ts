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
      url: '/main',
      icon: 'home'
    },
    {
      title: 'Productos',
      url: '/productlist',
      icon: 'cube'
    },
    {
      title: 'Crear Pedido',
      url: '/createorder',
      icon: 'cart'
    },
    {
      title: 'Mis Ventas',
      url: '/createorder',
      icon: 'stats'
    },
    {
      title: 'Clientes',
      url: '/customerlist',
      icon: 'body'
    },
    {
      title: 'Mis Datos',
      url: '/createorder',
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
