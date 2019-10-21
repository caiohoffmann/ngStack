import { createAction, props } from '@ngrx/store';
import { ReplyEventTypes } from 'src/app/core/events/reply.events';
import { Post } from 'src/app/core/models/post.model';
import { Reply } from 'src/app/core/models/reply.model';
import { Comment } from 'src/app/core/models/comment.model';

export const getAll = createAction(
    ReplyEventTypes.getAll,
    props<{ comment: Comment }>()
)

export const gotAll = createAction(
    ReplyEventTypes.gotAll,
    props<{ replies: Reply[] }>()
);

export const createReply = createAction(
    ReplyEventTypes.createReply,
    props<{ reply: Reply }>()
);

export const createReplySuccess = createAction(
    ReplyEventTypes.createReplySuccess,
    props<{ reply: Reply }>()
)