import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, Router } from '@angular/router';
import { loginForm, signUp } from '../dataType';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  firstName:string = ''
  password:string = ''
  email:string = ''


  showLoginForm:boolean = false;
  authError:string = ''

  constructor(private sellerService: SellerService,
    private router: Router) { }

  ngOnInit(): void {
    this.sellerService.loadSeller()
   //localStorage.removeItem('seller')

  }
  signUp(data:signUp){
  console.warn(data)
  this.sellerService.signUpFn(data)

  }

  showLogin(){
  this.showLoginForm = true
  }
  showSignUp(){
    this.showLoginForm = false
  }

  login(data:loginForm):void {
    console.warn(data)
    this.sellerService.loginForm(data)
    this.sellerService.isLoginError.subscribe(isError=>{
      if(isError){
        this.authError="Credentials is wrong"
      }
    })
  }
}
