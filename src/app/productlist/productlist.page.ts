import { Component, OnInit } from '@angular/core';
import { WpRestApiService } from '../wp-rest-api.service';
import { NavController, ToastController } from '@ionic/angular';
import { UserdataService } from '../userdata.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {

  private productList:any;

  constructor(
    public wpRestApi : WpRestApiService,
    public nav : NavController,
    public userData : UserdataService,
    public router : Router,
    private storage: Storage,
    public order : OrderService,
    public toastCtrl: ToastController,
  ) { 
    this.getProductList();
  }

  ngOnInit() {
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: 'Producto cargado correctamente',
      duration: 1500,
      showCloseButton: true,
     closeButtonText: 'Ok',
    });
    toast.present();
  }

  getProductList()
  { 
    this.storage.get('TOKEN').then(token => {
      this.wpRestApi.getWoocommerceProductList(token.token)
      .then( data => {
        this.productList = data;

        this.productList.forEach(element => {
          if (element.stock_quantity < 1){
            element.count = 0;
          } else {
            element.count = 1;
          }
            
        });
      })
      .catch(err => {
        console.log(err);
      });
    });
  }

  setProductToOrder(product:any) {
    this.order.setProductToList(product);
    this.showToast();
    if (product.count > product.stock_quantity) {
      console.log('no se puede')
    } else {
      //this.gotToCreateOrder();
    }
  }

  gotToCreateOrder()
  {
    this.nav.navigateForward('createorder');
  }

}
