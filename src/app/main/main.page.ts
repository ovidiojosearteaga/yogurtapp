import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(
    public router : Router,
    public nav : NavController,
  ) { }

  ngOnInit() {
  }

  goToProductList()
  {
    this.nav.navigateForward('productlist');
  }

  goToCreateOrder()
  {
    this.nav.navigateForward('createorder');
  }

  goToCustomerList()
  {
    this.nav.navigateForward('customerlist');
  }

}
