import { EventEmitter, Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http'
import { loginForm, signUp } from '../dataType';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject(false)
  isLoginError = new EventEmitter<boolean>(false)
  baseUrl='http://localhost:3000/seller'
  constructor(private http: HttpClient,
    private router: Router) { }

  signUpFn(data:signUp){
    this.http.post(this.baseUrl, data,{observe:'response'}).subscribe((res)=>{
      this.isSellerLoggedIn.next(true)
      localStorage.setItem('seller', JSON.stringify(res.body))
      this.router.navigate(['seller-home'])

    })
    return false
  }

  loadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
       this.router.navigate(['seller-home'])
    }
  }

  loginForm(data:loginForm){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, {observe:'response'}).subscribe((result:any)=>{
      if(result && result.body && result.body.length){
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      }
      else {
        this.isLoginError.emit(true)
      }
    })
  }


}
