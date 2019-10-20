import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/users-reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users-effects';
import { UsersService } from './services/user.service';
import { UsersStoreFacade } from './store/users.store-facade';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ user: reducer }),
    EffectsModule.forRoot([UsersEffects])
  ],
  providers: [UsersService, UsersStoreFacade],
  bootstrap: [AppComponent]
})
export class AppModule { }
