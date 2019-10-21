import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion'


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
import { PostEffects } from './store/posts/posts-effects';
import { RepliesEffects } from './store/replies/replies-effects';
import { ReplyServices } from './services/reply.service';

@NgModule({
  declarations: [
    AppComponent,
    ReplyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ user: userReducer, replys: replyReducer, posts: postsReducer }),

    MatSliderModule,
    MatTabsModule,
    MatDividerModule,
    MatMenuModule,
    // Material
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,

    EffectsModule.forRoot([UsersEffects, PostEffects, RepliesEffects])
  ],
  providers: [UsersService, UsersStoreFacade, RepliesStoreFacade, PostsServices, PostsStoreFacade, ReplyServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
