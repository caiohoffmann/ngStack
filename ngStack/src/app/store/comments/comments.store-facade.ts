import { Injectable } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducer';
import { Comment } from 'src/app/core/models/comment.model';
import { createComment, getAllComments } from './comments-actions';


@Injectable()
export class CommentsStoreFacade {

    constructor(private store: Store<AppState>) { }

    getAll(idPost) {
        this.store.dispatch(getAllComments({ id_post: idPost }));
    }

    seeAll() {
        return this.store.pipe(select('comments'));
    }

    createComment(comment: Comment) {
        this.store.dispatch(createComment({ comment }));
    }
}