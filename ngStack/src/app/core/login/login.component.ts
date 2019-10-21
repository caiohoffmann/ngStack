import { LoginService } from './../../services/login/login.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
  <form>
  <mat-form-field>
    <mat-label>First name</mat-label>
    <input matInput (cdkAutofill)="userNameAutofilled = $event.isAutofilled">
    <mat-hint *ngIf="userNameAutofilled">Autofilled!</mat-hint>
  </mat-form-field>
  <br>
  <mat-form-field>
    <mat-label>Password</mat-label>
    <input matInput  type="password" (cdkAutofill)="password = $event.isAutofilled">
    <mat-hint *ngIf="passwordAutofilled">Autofilled!</mat-hint>
  </mat-form-field><br>
  <button mat-raised-button>login</button>
</form>`,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() username;
  @Input() password;

  // userAutofilled: boolean;
  //   passwordAutofilled: boolean;
  constructor(private loginService: LoginService, private router: Router) { }
  validateLogin() {
    if (this.username && this.password) {
      this.loginService.validateLogin(this.username, this.password).subscribe((result: { token: string, username: string }) => {
        if (result.token) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('loggedInUser', result.username);
          this.loginService.emitValue(result.username);
        }

        this.router.navigate(['/home']);
      }, error => {
        console.log('error is ', error);
      });
    } else {
      alert('enter user name and password');
    }
  }

  ngOnInit() {
  }

}
