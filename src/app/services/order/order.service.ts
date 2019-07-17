import { Injectable } from '@angular/core';
import { WpRestApiService } from '../wp-rest-api/wp-rest-api.service';
import { UserdataService } from '../userdata/userdata.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private customerData:any;
  private productList:any;
  private orderTotal:number = 0;
  private orderUnitTotal:number = 0;
  
  constructor(
    private wpRest: WpRestApiService,
    private userData: UserdataService,
  ) { 
    this.productList = [];
  }

  calculateOrderTotal()
  {
    this.orderTotal = 0;

    this.productList.forEach(product => {
      this.orderTotal += product.count * product.regular_price;
    });
  }

  getOrderTotal()
  {
    return this.orderTotal;
  }

  calculateOrderUnitTotal()
  {
    this.orderUnitTotal = 0;
    this.productList.forEach(product => {
      this.orderUnitTotal += product.count;
    });
  }

  getOrderUnitTotal()
  {
    return this.orderUnitTotal;
  }

  setCustomerData(customerData:any) {
    this.customerData = customerData;
  }

  getCustomerData()
  {
    return this.customerData;
  }

  setProductToList(product:any)
  {
    this.productList.push(product);
    this.calculateOrderTotal();
    this.calculateOrderUnitTotal();
  }

  getProductList()
  {
    return this.productList;
  }

  removeProduct(id:number) {
    this.productList.forEach((el, i) => {
      if (el.id == id)
        this.productList.splice(i, 1);
    });

    this.calculateOrderTotal()
    this.calculateOrderUnitTotal();
  }

  async createOrder()  
  {
    let orderData:any = {
      "set_paid": true,
      "billing": {
        "first_name": this.customerData.billing_first_name,
        "last_name": this.customerData.billing_last_name,
        "address_1": this.customerData.billing_address_1,
        "address_2": this.customerData.billing_adders_2,
        "city": this.customerData.billing_city,
        "state": this.customerData.billing_state,
        "postcode": this.customerData.billing_postcode,
        "country": this.customerData.billing_country,
        "email": this.customerData.billing_email,
        "phone": this.customerData.billing_phone
      },
      "line_items": []
    };

    this.productList.forEach( p => {
      orderData.line_items.push({
        "product_id": p.id,
        "quantity": p.count
      });
    });

    return this.wpRest.setWoocommerceOrder(orderData, this.userData.getTokenCode())
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      })
  }


}
