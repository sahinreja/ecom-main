import { ProductsService } from './../../service/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user:any; 
  constructor(public productsService:ProductsService) {
    this.productsService.getUserProfile().subscribe((res)=>{
      console.log(res);
      this.user = res;
    }, (err)=>{
      console.log(err);
    })
   }

  ngOnInit(): void {
  }

}
