import { Observable } from 'rxjs';
import { UsersStoreFacade } from 'src/app/store/users/users.store-facade';
import { UsersService } from '../../../services/user.service';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-edit',
  template: `<form [formGroup]="registerForm" (ngSubmit)="onFormSubmit()">
  <div class="form-group">
    <label for="firstName"> Name</label>
        <input type="text" formControlName="name" class="form-control" [ngClass]="{ 'is-invalid': submitted && fval.firstName.errors }" value={{user.name}}/>
        <div *ngIf="submitted && fval.firstName.errors" class="invalid-feedback">
            <div *ngIf="fval.firstName.errors.required">First Name is required</div>
        </div>
  </div>

  <div class="form-group">
    <label for="email">Picture</label>
    <input type="text" formControlName="picture" class="form-control" [ngClass]="{ 'is-invalid': submitted && fval.picture.errors }" value={{user.picture}}/>
    <div *ngIf="submitted && fval.picture.errors" class="invalid-feedback">
        <div *ngIf="fval.picture.errors.required">Pictureis required</div>
        <div *ngIf="fval.email.errors.email">Enter valid Picture </div>
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
Edit
    </button>
  
</div>
</form>`,
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  myForm: FormGroup;
  user: User;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UsersService, private userFacade: UsersStoreFacade) { }

  registerForm: FormGroup;
  loading = false;
  submitted = false;


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      picture: ['', Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.userFacade.getUser().subscribe(u => {
      this.user = u;
      
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
    const u = this.registerForm.value;
    u.id = this.user.id;
    console.dir(u);
    this.userService.update(u).subscribe(
      (data) => {
        alert('Edit successfully!!');
        this.router.navigate(['/home']);
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

