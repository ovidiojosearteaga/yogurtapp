import { Component, OnInit } from '@angular/core';
import { WpRestApiService } from '../wp-rest-api.service';
import { NavController } from '@ionic/angular';
import { UserdataService } from '../userdata.service';
import { Router } from '@angular/router';

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
  ) { 
    this.getProductList();
  }

  ngOnInit() {
  }

  getProductList()
  { 
    this.wpRestApi.getWoocommerceProductList(this.userData.getTokenCode())
      .then( data => {
        this.productList = data;
      })
      .catch(err => {
        console.log(err);
      });
  }

}
