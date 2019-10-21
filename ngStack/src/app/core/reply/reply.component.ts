import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Reply } from '../models/reply.model';
import { RepliesStoreFacade } from 'src/app/store/replies/replies.store-facade';
import { UsersStoreFacade } from 'src/app/store/users/users.store-facade';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { PostsStoreFacade } from 'src/app/store/posts/posts.store-facade';
import { CommentsStoreFacade } from 'src/app/store/comments/comments.store-facade';
import { Comment } from '../models/comment.model';

@Component({
    selector: 'reply',
    templateUrl: './reply.component.html',
    styles: ['']
})
export class ReplyComponent {
    token: Observable<string>;
    user: Observable<User>;
    posts: Observable<Post[]>;
    comments: Observable<Comment[]>;
    constructor(private userFacade: UsersStoreFacade, private postFacade: PostsStoreFacade, private commentFacade: CommentsStoreFacade) {
        this.userFacade.login({ id: '5dad5a268f0c0815e8a742f7', email: 'caio2@mum.edu', password: '123', name: 'Caio Hoffmann' });
        this.token = this.userFacade.getToken();
        this.token.subscribe(t => {
            this.commentFacade.getAll('5dad0bdf4ed73e3a6086f4b2');
        });
        this.user = this.userFacade.getUser();

        this.posts = this.postFacade.seeAll();
        this.comments = this.commentFacade.seeAll();
    }
    create() {
        // this.postFacade.createPost({
        //     title: 'This is the other post i created',
        //     tags: ['Tech']
        // });
        this.commentFacade.createComment({ content: 'This is my new comment', idPost: '5dad0bdf4ed73e3a6086f4b2' });
    }
}
