import { Component, OnInit } from '@angular/core';
import { WpRestApiService } from '../../services/wp-rest-api/wp-rest-api.service';
import { NavController } from '@ionic/angular';
import { UserdataService } from '../../services/userdata/userdata.service';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { Storage } from '@ionic/storage';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.page.html',
  styleUrls: ['./customerlist.page.scss'],
})
export class CustomerlistPage implements OnInit {

  private customerList:any;
  private showList:boolean = false;

  constructor(
    public wpRestApi : WpRestApiService,
    public nav : NavController,
    public userData : UserdataService,
    public router : Router,
    public order : OrderService,
    private storage : Storage,
    private loading : LoadingService,
  ) { 
    this.loading.present('Cargando clientes...');
    this.getCustomers();
  }

  ngOnInit() {
  }

  getCustomers()
  {
    this.storage.get('TOKEN').then(token => {
      this.wpRestApi.getWordpressUserByRole('cliente', token.token)
      .then( data => {
        this.customerList = data;
        this.showList = true;
        this.loading.dismiss();
      })
      .catch( err => {
        console.log(err);
      });
    });
  }

  setCustomerToOrder(customer:any) 
  {
    this.order.setCustomerData(customer);
    this.goToCreateOrder();
  }

  goToCreateOrder()
  {
    this.nav.navigateForward('/tabs/createorder');
  }

}
