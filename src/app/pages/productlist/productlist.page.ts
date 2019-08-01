import { Component, OnInit } from '@angular/core';
import { WpRestApiService } from '../../services/wp-rest-api/wp-rest-api.service';
import { NavController, ToastController } from '@ionic/angular';
import { UserdataService } from '../../services/userdata/userdata.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { OrderService } from '../../services/order/order.service';
import { AlertService } from '../../services/alert/alert.service';
import { LoadingService } from '../../services/loading/loading.service';
import { ProductPageModule } from '../product/product.module';

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
    private alert: AlertService,
    private loading: LoadingService
  ) { 
    this.loading.present('Cargando productos...');
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
          element.totalCount = 0;

          if (element.stock_quantity < 1){
            element.count = 0;
          } else {
            element.count = 1;
          }
            
        });
       
        this.loading.dismiss();
      })
      .catch(err => {
        console.log(err);
      });
    });
  }

  setProductToOrder(product:any) {
    if (product.count > product.stock_quantity) {
      this.alert.present('La cantidad supera la disponibilidad en stock.');
      return;
    }

    if (this.orderHaveProduct(product)) {
      this.increaseProduct(product);

    } else {
      product.totalCount = product.count;
      product.stock_quantity -= product.count;
      this.order.setProductToList(product);
      product.count = 1;
      this.showToast();
    }
  }

  orderHaveProduct(product:any) 
  {
    let haveProduct = false;

    this.order.getProductList().forEach(p => {
      if (p.id == product.id)
        haveProduct = true;
    });

    return haveProduct;
  }

  increaseProduct(product:any)
  {
    this.order.getProductList().forEach(p => {
      if (p.id == product.id){
        p.totalCount += product.count;
        p.stock_quantity -= product.count;
        p.count = 1;
      }
    });

    this.showToast();
  }

  gotToCreateOrder()
  {
    this.nav.navigateForward('createorder');
  }

}
