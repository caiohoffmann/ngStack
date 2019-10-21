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
import { MatExpansionModule } from '@angular/material/expansion'


import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatLabel } from '@angular/material/'

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/users/users-reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users/users-effects';
import { UsersService } from './services/user.service';
import { PostsServices } from './services/post.service'
import { UsersStoreFacade } from './store/users/users.store-facade';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReplyComponent } from './core/reply/reply.component';
import { RepliesStoreFacade } from './store/replies/replies.store-facade';
import { PostsStoreFacade } from './store/posts/posts.store-facade';
import { postsReducer } from './store/posts/posts-reducer';
import { replyReducer } from './store/replies/replies-reducer';
import { PostEffects } from './store/posts/posts-effects';
import { RepliesEffects } from './store/replies/replies-effects';
import { ReplyServices } from './services/reply.service';
import { HomeComponent } from './core/home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { RouterModule } from '@angular/router';
import { AppHeaderComponent } from './core/header/app.header';
import { MyMaterialModule } from './material.module';
import { CommentsComponent } from './core/comments/app.comments';
import { globalroute } from './app.routes'
import { CommentService } from './services/comment.service';
import { LoginComponent } from './core/login/login.component';
import{DateAgoPipe} from './pipe/date-ago.pipe'







@NgModule({
  declarations: [
    AppComponent,
    ReplyComponent,
    AppHeaderComponent,
    CommentsComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    DateAgoPipe, 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ user: userReducer, replys: replyReducer, posts: postsReducer }),


    MatSliderModule,
    MatTabsModule,
    MatDividerModule,
    MatMenuModule,
    MyMaterialModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,

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

    EffectsModule.forRoot([UsersEffects, PostEffects, RepliesEffects])
  ],
  providers: [UsersService, UsersStoreFacade, , RepliesStoreFacade, PostsServices, PostsStoreFacade, ReplyServices],
  bootstrap: [AppComponent],
})
export class AppModule { }
