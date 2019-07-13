import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private customerData:any;
  private productList:any;
  private orderTotal:number = 0;
  private orderUnitTotal:number = 0;
  
  constructor() { 
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


}
