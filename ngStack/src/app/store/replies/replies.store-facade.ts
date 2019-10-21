import { Injectable } from "@angular/core";
import { select, Store } from '@ngrx/store';

import * as fromRoot from '../users/users-reducer';
import { getAll } from './replies-actions';
import { Post } from 'src/app/core/models/post.model';

@Injectable()
export class RepliesStoreFacade {

    constructor(private store: Store<fromRoot.State>) { }
    getAll() {
        this.store.dispatch(getAll());
    }

    all() {
        return this.store.pipe(select('replys'));
    }
}