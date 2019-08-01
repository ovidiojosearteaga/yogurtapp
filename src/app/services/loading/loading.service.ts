import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading:Boolean = false;

  constructor(public loadingController : LoadingController) 
  {
  }

  async present(message:string)
  {
    this.isLoading = true;
    return await this.loadingController.create({
      'message' : message,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading)
          a.dismiss().then(() => console.log('abort presenting'));
      });
    });
  }

  async dismiss()
  {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
}
