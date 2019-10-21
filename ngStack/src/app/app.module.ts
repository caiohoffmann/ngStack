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
    LoginComponent
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
    MyMaterialModule,

    // Material
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    globalroute,
    RouterModule,
    HttpClientModule,

    EffectsModule.forRoot([UsersEffects])
  ],
  providers: [UsersService, UsersStoreFacade, CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
