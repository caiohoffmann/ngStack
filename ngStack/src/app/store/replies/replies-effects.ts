import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { ReplyServices } from 'src/app/services/reply.service';
import { Observable } from 'rxjs';
import { Reply } from 'src/app/core/models/reply.model';
import { gotAll, getAll, createReply, createReplySuccess } from './replies-actions';
import { switchMap, pluck, map } from 'rxjs/operators';

@Injectable()
export class RepliesEffects {
    constructor(
        private actions$: Actions,
        private repliesService: ReplyServices) { }

    getAll$ = createEffect(() => this.actions$.pipe(
        ofType(getAll),
        pluck('comment'),
        switchMap((comment) => this.repliesService.getAll(comment).pipe(
            map(replies => gotAll({ replies: replies.data }))
        ))
    ));

    @Effect()
    create$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createReply),
            pluck('reply'),
            switchMap(reply =>
                this.repliesService.create(reply).pipe(
                    map(reply => createReplySuccess({ reply: reply.data }))
                )
            )
        )
    )
}