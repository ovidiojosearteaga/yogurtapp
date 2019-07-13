import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserdataService } from '../../services/userdata/userdata.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(
    public router : Router,
    public nav : NavController,
    public userdata : UserdataService,
    private storage: Storage,
  ) { 
    this.storage.get('USER_DATA').then(data => {
      console.log(data);
    });
  }

  ngOnInit() {
  }

  goToProductList()
  {
    this.nav.navigateForward('/tabs/products');
  }

  goToCreateOrder()
  {
    this.nav.navigateForward('/tabs/createorder');
  }

  goToCustomerList()
  {
    this.nav.navigateForward('/tabs/customerlist');
  }

}
