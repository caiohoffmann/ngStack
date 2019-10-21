import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `<form>
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
  <button mat-raised-button>login</button>
</form>`,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userAutofilled: boolean;
  passwordAutofilled: boolean;
  constructor() { }

  ngOnInit() {
  }

}
