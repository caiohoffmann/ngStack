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
<<<<<<< HEAD
import { MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

=======
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatLabel } from '@angular/material/'
>>>>>>> b39bf0398c17089184eb7b9a91b4f9d5477b0070

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


import { RouterModule } from '@angular/router';
import { AppHeaderComponent } from './core/header/app.header';
import { MatCardModule } from '@angular/material';
import { MyMaterialModule } from './material.module';
import { CommentsComponent } from './core/comments/app.comments';
import { globalroute } from './app.routes'
import { LoginComponent } from './core/login/app.logincomment';
import { CommentService } from './services/comment.service';







@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    CommentsComponent,
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
    MyMaterialModule,

    // Material
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    globalroute,
    RouterModule,
    HttpClientModule,

    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,

    MatFormFieldModule,
    MatInputModule,

    EffectsModule.forRoot([UsersEffects])
  ],
  providers: [UsersService, UsersStoreFacade],
  bootstrap: [AppComponent, LoginComponent, SignUpComponent, CommentService],
})
export class AppModule { }
