import { UserAuthService } from './../../service/user-auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public errMessage:any = "";
  options: FormGroup;
  floatLabelControl = new FormControl('male');
  constructor(private authService:UserAuthService ,
     private snakeBar:MatSnackBar , 
     private router:Router , 
     private fb:FormBuilder) { 
       this.options = fb.group({
        floatLabel:this.floatLabelControl
       })
     }

  ngOnInit(): void {
  }

  onSubmit(f:NgForm){
    console.log(f.value);
    this.authService.signup(f.value).subscribe(
      (res)=>{
        console.log(res);
        this.router.navigate(['/login']);
      },
      (err)=>{
        this.snakeBar.open(err.error , 'Cancel');
        this.errMessage = err.error;
        console.log(err);
      }
    )
  }

}
