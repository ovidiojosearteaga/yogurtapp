import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public alert : AlertController,
  ) { }

  async present(message:string) {
    return await this.alert.create({
      header: '',
      message: message,
      buttons: ['OK']
    }).then(a => {
      a.present();
    });
  }
}
