import { UsersStoreFacade } from './../../store/users/users.store-facade';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  template: `
  <h3>User Login</h3>
<form [formGroup]="loginForm" (ngSubmit)="onFormSubmit()">
    <div class="form-group">
        <label for="email">Email</label>
        <input type="text" formControlName="email" class="form-control" [ngClass]="{ 'is-invalid': submitted && fval.email.errors }" placeholder="Enter email here"/>
        <div *ngIf="submitted && fval.email.errors" class="invalid-feedback">
            <div *ngIf="fval.email.errors.required">Email is required</div>
            <div *ngIf="fval.email.errors.email">Enter valid email address</div>
        </div>
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" formControlName="password" class="form-control" [ngClass]="{ 'is-invalid': submitted && fval.password.errors }" placeholder="Enter password here" />
        <div *ngIf="submitted && fval.password.errors" class="invalid-feedback">
            <div *ngIf="fval.password.errors.required">Password is required</div>
        </div>
    </div>
    <div class="form-group">
        <button [disabled]="loading" class="btn btn-primary">
            <span *ngIf="loading" class="spinner-border spinner-border-sm mr-1"></span>
            Login
        </button>
        <p>Not a member?
        <a routerLink="/signup" class="btn btn-link">signup</a>
      </p>
       
  
    </div>
</form>`,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;


  // userAutofilled: boolean;
  //   passwordAutofilled: boolean;
  constructor(private loginService: LoginService, private router: Router, private _snackBar: MatSnackBar, private route: ActivatedRoute,
    private formBulider: FormBuilder, private userFacade: UsersStoreFacade

  ) { }

  ngOnInit() {

    this.loginForm = this.formBulider.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // accessing to form field
  get fval() { return this.loginForm.controls; }
  onFormSubmit() {

    this.submitted = true;
    if (this.loginForm.invalid) { return; }
    this.loading = true;
    this.userFacade.login({ email: this.fval.email.value, password: this.fval.password.value });
    this.loginService.validateLogin(this.fval.email.value, this.fval.password.value).subscribe(data => {
      this.router.navigate(['/home']);
    },

      error => {

        this.loading = false;
        console.log("Error is");
        this._snackBar.open("some thing problem with password and email please checking", "close!!")
      }
    );



  }



}
