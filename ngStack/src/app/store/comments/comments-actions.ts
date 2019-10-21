import { createAction, props } from '@ngrx/store';
import { Comment } from 'src/app/core/models/comment.model';
import { CommentEventTypes } from 'src/app/core/events/comment.events';


export const getAllComments = createAction(
    CommentEventTypes.getAll,
    props<{ id_post: string }>()
)

export const gotAllComments = createAction(
    CommentEventTypes.gotAll,
    props<{ comments: Comment[] }>()
)

export const createComment = createAction(
    CommentEventTypes.createComment,
    props<{ comment: Comment }>()
)

export const createCommentSuccess = createAction(
    CommentEventTypes.createdSuccess,
    props<{ comment: Comment }>()
)