import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/users-reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users-effects';
import { UsersService } from './services/user.service';
import { UsersStoreFacade } from './store/users.store-facade';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './core/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ user: reducer }),

    MatSliderModule,
    MatTabsModule,
    MatDividerModule,
    MatMenuModule,
    // Material
    MatButtonModule,
    MatIconModule,


    EffectsModule.forRoot([UsersEffects])
  ],
  providers: [UsersService, UsersStoreFacade],
  bootstrap: [AppComponent]
})
export class AppModule { }
