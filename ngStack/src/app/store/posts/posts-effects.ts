import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType, Effect } from '@ngrx/effects';
import { getAll, gotAll, createPost, createPostSuccess, updatePost, updatePostSuccess, deletePost, deletePostSuccess } from './posts-actions';
import { switchMap, pluck, mergeMap, map } from 'rxjs/operators';
import { PostsServices } from 'src/app/services/post.service';


@Injectable()
export class PostEffects {

    constructor(private actions$: Actions, private postService: PostsServices) { }

    @Effect()
    getAll$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getAll),
            mergeMap(_ => {
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
        mergeMap
            ((post) => this.postService.createPost(post))).pipe(
                map(newPost => createPostSuccess(newPost))
            ));

    @Effect()
    update$ = createEffect(() => this.actions$.pipe(
        ofType(updatePost),
        pluck('post'),
        switchMap(
            (post) => this.postService.updatePost(post).pipe(
                map(post => updatePostSuccess(post))
            )
        )
    ));

    @Effect()
    delete$ = createEffect(() => this.actions$.pipe(
        ofType(deletePost),
        pluck('id'),
        switchMap(
            (id) => this.postService.delete(id).pipe(
                map(post => deletePostSuccess(post))
            )
        )
    ));

}