import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { WpRestApiService } from './wp-rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  private userId: number;
  private token: any;
  private tokenCode: string;
  private data:any;

  constructor(
    public wpRest : WpRestApiService,
  ) { }

  getUserId():number
  {
    return this.userId;
  }

  setUserId(id:number)
  {
    this.userId = id;
  }

  getTokenCode():string
  {
    return this.tokenCode;
  }

  private setTokenCode(tokenCode:string)
  {
    this.tokenCode = tokenCode;
  }

  setToken(token:any)
  {
    this.token = token;
  }

  setUserData()
  {
    this.setTokenCode(this.token.token);
    const JWT = new JwtHelperService();
    this.setUserId(JWT.decodeToken(this.token.token).data.user.id);

    this.wpRest.getWordpressUserData(this.getUserId(), this.getTokenCode())
      .then(
        data => {
          this.data = data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getUserData()
  {
    return this.data;
  }
}
