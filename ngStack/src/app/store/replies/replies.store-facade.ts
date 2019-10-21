import { Injectable } from "@angular/core";
import { select, Store } from '@ngrx/store';

import { AppState } from '../reducer';
import { getAll } from './replies-actions';

@Injectable()
export class RepliesStoreFacade {

    constructor(private store: Store<AppState>) { }
    getAll() {
        this.store.dispatch(getAll());
    }

    all() {
        return this.store.pipe(select('replys'));
    }
}