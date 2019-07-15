import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
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

  createOrder() {

    console.log(this.order.getCustomerData());

    let exampleData = {
      "set_paid": true,
      "billing": {
        "first_name": "John",
        "last_name": "Doe",
        "address_1": "969 Market",
        "address_2": "",
        "city": "San Francisco",
        "state": "CA",
        "postcode": "94103",
        "country": "US",
        "email": "john.doe@example.com",
        "phone": "(555) 555-5555"
      },
      "line_items": [
        {
          "product_id": 40,
          "quantity": 2
        },
        {
          "product_id": 39,
          "quantity": 1
        }
      ]
    };

    this.order.createOrder(exampleData).then(data => {
      console.log(data);
    });
  }

}
