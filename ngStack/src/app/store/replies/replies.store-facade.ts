import { Injectable } from "@angular/core";
import { select, Store } from '@ngrx/store';

import * as fromRoot from '../index';
import { getAll } from './replies-actions';
import { Post } from 'src/app/core/models/post.model';

@Injectable()
export class RepliesStoreFacade {

    constructor(private store: Store<fromRoot.AppState>) { }
    getAll() {
        this.store.dispatch(getAll());
    }

    all() {
        return this.store.pipe(select('replys'));
    }
}