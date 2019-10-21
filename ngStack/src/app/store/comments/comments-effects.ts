import { Injectable } from "@angular/core";
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { CommentService } from 'src/app/services/comment.service';
import { switchMap, map, pluck } from 'rxjs/operators';
import { getAllComments, gotAllComments, createComment, createCommentSuccess } from './comments-actions';


@Injectable()
export class CommentEffects {
    constructor(private actions$: Actions, private commentService: CommentService) { }

    @Effect()
    getAllComments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getAllComments),
            switchMap(_ =>
                this.commentService.getComments('1').pipe(
                    map(comments => gotAllComments({ comments }))
                )
            )
        ));

    @Effect()
    createComment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createComment),
            pluck('comment'),
            switchMap(comment =>
                this.commentService.sendComment(comment).pipe(
                    map(comment => createCommentSuccess(comment))
                )
            )
        )
    );
}