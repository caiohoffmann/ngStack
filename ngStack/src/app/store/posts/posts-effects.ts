import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType, Effect } from '@ngrx/effects';
import { getAll, gotAll, createPost, createdPost } from './posts-actions';
import { switchMap, pluck, mergeMap, map } from 'rxjs/operators';
import { PostsServices } from 'src/app/services/post.service';


@Injectable()
export class PostEffects {

    constructor(private actions$: Actions, private postService: PostsServices) { }

    @Effect()
    getAll$ = createEffect(() => {
        console.log('first');
        return this.actions$.pipe(
            ofType(getAll),
            mergeMap(_ => {
                console.log('effect')
                return this.postService.getAll().pipe(
                    map(posts => gotAll({ posts }))
                )
            })
        )
    });

    @Effect()
    create$ = createEffect(() => this.actions$.pipe(
        ofType(createPost),
        pluck('post'),
        switchMap
            ((post) => this.postService.createPost(post))).pipe(
                map(newPost => createdPost(newPost))
            ));
}