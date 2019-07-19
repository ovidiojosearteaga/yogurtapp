import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserdataService } from '../userdata/userdata.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public alert : AlertController,
    private userdata: UserdataService,
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

  async recoveryPassword() {
    return await this.alert.create({
      header: 'Recuperar contraseña',
      message: 'Introduce tu nombre de usuario',
      buttons: [{
        text: 'OK',
        handler: data => {
          if (data.username.length > 0) {
            this.userdata.recoveryPassword(data.username);
          } else {
            this.present('Introduce un nombre de usuario valido.');
          }
        }
      }],
      inputs: [{
        name: 'username'
      }],
    }).then(a => {
      a.present().then(data => { console.log(data) });
    });
  }
}
