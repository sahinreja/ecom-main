import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../service/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  hideForm:any = true;
  address:any = "";
  pinCode:any = ""
  cartProducts:any
  constructor(public productService:ProductsService , private router:ActivatedRoute) {
    // localStorage.getItem('user')
    // this.productService.getAddress()
    // console.log(this.productService.cartProducts);
    
    const user_id = this.router.snapshot.paramMap.get('id');
    this.productService.getAddress(user_id).subscribe((res)=>{
      console.log(res);
      if(res.message == 'Address found'){
        this.hideForm = false;
        this.address = res.address.address,
        this.pinCode = res.address.pinCode
      }
    } , (err)=>{
      console.log(err);
    })
   }

  ngOnInit(): void {
  }

}
