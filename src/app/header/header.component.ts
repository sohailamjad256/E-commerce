import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType:string ='Default'
  sellerName:string = ''

  constructor( private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((val:any)=>{
      console.log(val)
      if(val.url){
      if( localStorage.getItem('seller') && val.url.includes('seller')){
          console.log(val.url)
          this.menuType = 'seller'
          console.log('menuType',this.menuType)
          let sellerData = localStorage.getItem('seller')
          let sellerParseData = sellerData && JSON.parse(sellerData)[0]
          this.sellerName = sellerParseData.name

      }
      else {
        this.menuType ='Default'
        console.log('menuType',this.menuType)
      }
    }

    })
  }

  logout(): void {
    localStorage.removeItem('seller')
    this.router.navigate(['home'])
  }

}
