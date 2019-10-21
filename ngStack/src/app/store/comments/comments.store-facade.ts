import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { AppState } from '../reducer';
import { Comment } from 'src/app/core/models/comment.model';
import { createComment, getAllComments } from './comments-actions';


@Injectable()
export class CommentsStoreFacade {

    constructor(private store: Store<AppState>) { }

    getAll() {
        this.store.dispatch(getAllComments());
    }

    createComment(comment: Comment) {
        this.store.dispatch(createComment({ comment }));
    }
}