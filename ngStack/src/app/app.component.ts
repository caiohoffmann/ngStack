import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './core/models/user.model';
import { UsersStoreFacade } from './store/users/users.store-facade';
import { PostsStoreFacade } from './store/posts/posts.store-facade';
import { Post } from './core/models/post.model';
import { RepliesStoreFacade } from './store/replies/replies.store-facade';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})


export class AppComponent {


}
