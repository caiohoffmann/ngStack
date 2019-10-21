import { LoginService } from './../../services/login/login.service';
import { FormControl, FormBuilder ,FormArray} from '@angular/forms';

import{FormGroup,Validators, }from "@angular/forms"
import {Router}from '@angular/router'
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-signup',
    template: `<form [formGroup]="myForm" (ngSubmit)="onSubmit()">
    <mat-form-field>
      <mat-label>First name</mat-label>
      <input matInput (cdkAutofill)="userNameAutofilled = $event.isAutofilled">
      <mat-hint *ngIf="userNameAutofilled">Autofilled!</mat-hint>
    </mat-form-field>
    <br>
    <mat-form-field>
      <mat-label>Password</mat-label>
      <input matInput  type="password" (cdkAutofill)="passwordAutofilled = $event.isAutofilled">
      <mat-hint *ngIf="passwordAutofilled">Autofilled!</mat-hint>
    </mat-form-field><br>

    <mat-form-field>
    <mat-label>Email </mat-label>
    <input matInput (cdkAutofill)="EmailAutofilled = $event.isAutofilled">
    <mat-hint *ngIf="emailAutofilled">Autofilled!</mat-hint>
  </mat-form-field>
  <br>
    <button mat-raised-button>login</button>
  </form>
  
  
  `,
    styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

    userAutofilled: boolean;
    passwordAutofilled: boolean;
    emailAutofilled: boolean;
    myForm:FormGroup;
  
    constructor(private formBuilder:FormBuilder,private loginService:LoginService, private router:Router) { 

   this.myForm=formBuilder.group({
  'username':['',Validators.required],
  
  'email':['',[
    Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
  ]],
  'password':['',Validators.required],

});
 

this.myForm.valueChanges.subscribe((data:any)=>console.log(data));
    }



    onSubmit(){

      let userData=this.myForm.value;

      if(userData.username&&userData.password&&userData.email){
        this.loginService.add(userData.username,userData.password,userData.email).subscribe(result=>{
          if(result){
            this.router.navigate(['/login']);
          }
          else{
            console.log("problemsingup")
          }
        }
        ,error=>{console.log('erro',error);});
        
      }
      else{
        alert('enter titile ')
      }

    }
ngOnInit() {
    }


}
