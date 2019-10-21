import { createAction, props } from '@ngrx/store';
import { ReplyEventTypes } from 'src/app/core/events/reply.events';
import { Post } from 'src/app/core/models/post.model';
import { Reply } from 'src/app/core/models/reply.model';

export const getAll = createAction(
    ReplyEventTypes.getAll
)

export const gotAll = createAction(
    ReplyEventTypes.gotAll,
    props<{ replies: Reply[] }>()
);