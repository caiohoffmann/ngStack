import { Component, ViewChild, Input } from '@angular/core';
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
    styles: ['ul{margin-top:5px;}']
})
export class ReplyComponent {
    token: Observable<string>;
    user: Observable<User>;
    posts: Observable<Post[]>;
    comments: Observable<Comment[]>;
    @Input('replies') replies;
    @Input() idComment;
    @Input() idPost;
    constructor(private userFacade: UsersStoreFacade, private postFacade: PostsStoreFacade, private commentFacade: CommentsStoreFacade, private replyFacade: RepliesStoreFacade) {


    }
    create(reply) {
        this.replyFacade.create({ content: reply, idPost: this.idPost, idComment: this.idComment });
    }
}
