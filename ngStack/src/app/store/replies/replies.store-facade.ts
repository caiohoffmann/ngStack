import { Injectable } from "@angular/core";
import { select, Store } from '@ngrx/store';

import { AppState } from '../reducer';
import { getAll, createReply, likeReply } from './replies-actions';
import { Reply } from 'src/app/core/models/reply.model';
import { Comment } from 'src/app/core/models/comment.model';

@Injectable()
export class RepliesStoreFacade {

    constructor(private store: Store<AppState>) { }
    getAll(comment: Comment) {
        this.store.dispatch(getAll({ comment }));
    }

    all() {
        return this.store.pipe(select('replys'));
    }

    create(reply: Reply) {
        this.store.dispatch(createReply({ reply }));
    }

    like(reply: Reply) {
        this.store.dispatch(likeReply({ reply }));
    }
}