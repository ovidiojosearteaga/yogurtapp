import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-createorder',
  templateUrl: './createorder.page.html',
  styleUrls: ['./createorder.page.scss'],
})
export class CreateorderPage implements OnInit {

  constructor(
    public order : OrderService,
    public nav : NavController,
  ) { 
  }

  haveCustomer():boolean
  {
    if (this.order.getCustomerData() != undefined)
      return true;

    return false;
  }

  ngOnInit() {
  }

  goToCustomerList() {
    this.nav.navigateForward('/tabs/customerlist');
  }

  goToProductList() {
    this.nav.navigateForward('/tabs/products');
  }

}
