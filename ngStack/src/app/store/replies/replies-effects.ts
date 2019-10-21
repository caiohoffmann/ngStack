import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { ReplyServices } from 'src/app/services/reply.service';
import { Observable } from 'rxjs';
import { Reply } from 'src/app/core/models/reply.model';
import { gotAll, getAll } from './replies-actions';
import { switchMap, pluck, map } from 'rxjs/operators';

@Injectable()
export class RepliesEffects {
    constructor(
        private actions$: Actions,
        private repliesService: ReplyServices) { }

    getAll$ = createEffect(() => this.actions$.pipe(
        ofType(getAll),
        switchMap(() => this.repliesService.getAll().pipe(
            map(replies => gotAll({ replies }))
        ))
    ));
}