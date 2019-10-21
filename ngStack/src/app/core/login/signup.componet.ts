import { UsersService } from './../../services/user.service';
import { LoginService } from '../../services/login.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-signup',
  template: `<form [formGroup]="registerForm" (ngSubmit)="onFormSubmit()">
    <div class="form-group">
      <label for="firstName"> Name</label>
          <input type="text" formControlName="name" class="form-control" [ngClass]="{ 'is-invalid': submitted && fval.firstName.errors }" placeholder="Enter First Name here"/>
          <div *ngIf="submitted && fval.firstName.errors" class="invalid-feedback">
              <div *ngIf="fval.firstName.errors.required">First Name is required</div>
          </div>
    </div>
  
    <div class="form-group">
      <label for="email">Email</label>
      <input type="text" formControlName="email" class="form-control" [ngClass]="{ 'is-invalid': submitted && fval.email.errors }" placeholder="Enter email here"/>
      <div *ngIf="submitted && fval.email.errors" class="invalid-feedback">
          <div *ngIf="fval.email.errors.required">Email is required</div>
          <div *ngIf="fval.email.errors.email">Enter valid email address</div>
      </div>
    </div>
    
    <div class="form-group">
      <label for="email">Password</label>
      <input type="password" formControlName="password" class="form-control" [ngClass]="{ 'is-invalid': submitted && fval.password.errors }" placeholder="Enter Password here"/>
      <div *ngIf="submitted && fval.password.errors" class="invalid-feedback">
          <div *ngIf="fval.password.errors.required">Password is required</div>
          <div *ngIf="fval.password.errors.minlength">Password must be at least 6 characters</div>
      </div>
      
    </div>
  
    <div class="form-group">
      <button [disabled]="loading" class="btn btn-primary">
          <span *ngIf="loading" class="spinner-border spinner-border-sm mr-1"></span>
  SignUp
      </button>
      <a routerLink="/login" class="btn btn-link">Login to continue...</a>
  </div>
  </form>
  
  `,
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {


  email = new FormControl('', [Validators.required, Validators.email]);
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private userService: UsersService) { }

  registerForm: FormGroup;
  loading = false;
  submitted = false;


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  get fval() { return this.registerForm.controls; }



  onFormSubmit() {
    this.submitted = true;
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.register(this.registerForm.value).subscribe(
      (data) => {
        alert('User Registered successfully!!');
        this.router.navigate(['/login']);
      },
      error => {
        console.dir(error)
        console.log(`Erro : ${error}`);

      }
      // (error)=>{
      //   //this.toastr.error(error.error.message, 'Error');
      //   this.loading = false;
      //   console.log()
      // }
    )

  }

}

