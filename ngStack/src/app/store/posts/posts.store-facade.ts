import { Injectable } from "@angular/core";
import * as fromRoot from '../index';
import { Store, select } from '@ngrx/store';
import { getAll, createPost } from '../posts/posts-actions';
import { Post } from 'src/app/core/models/post.model';


@Injectable()
export class PostsStoreFacade {

    constructor(private store: Store<fromRoot.AppState>) { }

    getAll() {
        this.store.dispatch(getAll());
    }

    createPost(post: Post) {
        this.store.dispatch(createPost({ post }));
    }

    seeAll() {
        return this.store.pipe(select('posts'));
    }
}