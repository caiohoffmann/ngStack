import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './core/models/user.model';
import { UsersStoreFacade } from './store/users/users.store-facade';
import { PostsStoreFacade } from './store/posts/posts.store-facade';
import { Post } from './core/models/post.model';
import { RepliesStoreFacade } from './store/replies/replies.store-facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['./app.component.css']
})
export class AppComponent {
  posts: Observable<Post[]>;
  user: Observable<User>;
  constructor(private usersStoreFacade: UsersStoreFacade, private postsStoreFacade: PostsStoreFacade, private replyStoreFacade: RepliesStoreFacade) {


  }

  ngOnInit() {
    this.posts = this.postsStoreFacade.seeAll();
    this.user = this.usersStoreFacade.getUser();
  }

  login() {
    //this.usersStoreFacade.login({ email: 'caio@mum.edu', password: '123' });
    this.postsStoreFacade.getAll();

    this.replyStoreFacade.getAll();
  }
}
