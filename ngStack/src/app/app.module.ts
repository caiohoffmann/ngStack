import { Router } from '@angular/router';
import { SignUpComponent } from './core/login/signup.componet';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';


import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/users-reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users-effects';
import { UsersService } from './services/user.service';
import { UsersStoreFacade } from './store/users.store-facade';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './core/home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './core/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ user: reducer }),


    MatSliderModule,
    MatTabsModule,
    MatDividerModule,
    MatMenuModule,
    // Material
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,

    MatFormFieldModule,
    MatInputModule,

    EffectsModule.forRoot([UsersEffects])
  ],
  providers: [UsersService, UsersStoreFacade, Router],
  bootstrap: [AppComponent, LoginComponent, SignUpComponent],
})
export class AppModule { }
