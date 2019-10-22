import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router'
import { UsersStoreFacade } from '../store/users/users.store-facade';
import { variable } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  tokenAuth;
  constructor(private _router: Router, private _userFacade: UsersStoreFacade) { }
  canActivate(): boolean {
    this._userFacade.getToken().subscribe(res => {
      this.tokenAuth = res;
    });
    if (this.tokenAuth) {
      return true
    }
    else {
      this._router.navigate(['/login']);
      return false;
    }
  }

}

