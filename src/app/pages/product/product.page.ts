import { Component, OnInit } from '@angular/core';
import { WpRestApiService } from '../../services/wp-rest-api/wp-rest-api.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UserdataService } from '../../services/userdata/userdata.service';
import { OrderService } from '../../services/order/order.service';
import { AlertService } from '../../services/alert/alert.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  private id:string;
  private data:any;
  private showData:boolean = false;
  private count:number = 1;

  constructor(
    public wpRestApi : WpRestApiService,
    public nav : NavController,
    public route : ActivatedRoute,
    public userData : UserdataService,
    public order : OrderService,
    public alert : AlertService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProduct();
  }

  getProduct()
  {    
    this.wpRestApi.getWoocommerceProduct(this.id, this.userData.getTokenCode())
      .then( data => {
        this.data = data;
        this.showData = true;
      })
      .catch(err => {
        console.log(err);
      });
  }

  setCountProduct(product:any)
  {
    product.count = this.count;
    return product;
  }

  setProdutToOrder()
  {
    if (this.orderHaveProduct()) {
      console.log('el producto ya existe');
      this.alert.present('El producto ya existe en la orden.');
      return;
    } 

    console.log(this.orderHaveProduct());
    this.order.setProductToList(this.setCountProduct(this.data));
    this.gotToCreateOrder();
  }

  gotToCreateOrder()
  {
    this.nav.navigateForward('createorder');
  }

  orderHaveProduct() 
  {
    let haveProduct = false;

    this.order.getProductList().forEach(product => {
      if (product.id == this.data.id)
        haveProduct = true;
    });

    return haveProduct;
  }
}
