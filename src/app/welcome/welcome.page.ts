import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingServiceService } from '../loading-service.service';
import { WpRestApiService } from '../wp-rest-api.service';
import { UserdataService } from '../userdata.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  private userName:string = 'ovidio';
  private password:string = '12341234';
  private showErrorMessage:boolean = false;
  private loginErrorMessage:boolean = false;
  private showLogin:boolean = false;
  private token:any;

  constructor(
    public loading : LoadingServiceService,
    public wpRestApi : WpRestApiService,
    public userData : UserdataService,
    public nav : NavController,
    public router : Router,
    private storage : Storage,
    
  ) 
  { 
    this.verifyAccess();
  }

  verifyAccess() 
  {
    //this.storage.remove('TOKEN');
    
    this.storage.get('TOKEN').then( token => {
      if (token !== null ) {
        this.userData.setToken(token);
        this.userData.setUserData().then(() => {
          this.goToMainPage();
        });
        
      } else {
        this.showLogin = true;
      }
    });
    
  }

  ngOnInit() {
  }

  async login() {
    if (!this.fieldsEmpty()) {
      this.showErrorMessage = false;
      this.loading.present('Entrando al sistema...');
      this.getJWTToken({'username':this.userName, 'password':this.password});
    } else {
      this.showErrorMessage = true;
    }
  }

  fieldsEmpty() : boolean
  {
    if ( this.userName == '' || this.password == '')
      return true;
    
    return false;
  }

  getJWTToken(data:any) 
  {    
    this.wpRestApi.getJWTToken(data)
    .then(res => {
      this.token = res;
      if ( this.token.token === undefined) {
        this.loading.dismiss();
        this.loginErrorMessage = true;

      } else {
        this.loading.dismiss();
        this.loginErrorMessage = false;
        this.userData.setToken(this.token);
        this.userData.setUserData();
        
        this.goToMainPage();
      }
    }).catch(
      err => {
        console.log(err);
      }
    );
  }

  goToMainPage()
  {
    this.nav.navigateRoot('main');
  }

}