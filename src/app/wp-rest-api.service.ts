import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WpRestApiService {

  //apiUrl = 'http://localhost:8087/wp-json/';
  apiUrl  = 'http://applacteoselportillo.com/wp-json/';

  constructor(
    public http: HttpClient,
  ) { }

  getJWTToken(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'jwt-auth/v1/token', data).
      subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      });
    });
  }

  getWordpressUserData(userId:number, token:string)
  {
    return new Promise(resolve => {
      this.http.get(
        this.apiUrl+'wp/v2/users/'+userId,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer '+token),
        }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      })
    });
  }

  getWoocommerceProductList(token:string)
  {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'wc/v3/products',
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer '+token),
      }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getWoocommerceProduct(id:string, token:string)
  {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'wc/v3/products/'+id,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer '+token),
      }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getWordpressUserByRole(role:string, token:string)
  {
    return new Promise(resolve => {
      this.http.get(
        this.apiUrl+'wp/v2/users/?roles='+role,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer '+token),
        }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      })
    });
  }
  
}
