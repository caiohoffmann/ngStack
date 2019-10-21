import { Comment } from 'src/app/core/models/comment.model';
import { createReducer, on } from '@ngrx/store';
import { gotAllComments, createCommentSuccess } from './comments-actions';


export interface State {
    comments: Comment[]
}

export const initialState: State = {
    comments: null
}

export const commentReducer = createReducer<State>(
    initialState,
    on(gotAllComments, (state, { comments }) =>
        ({ ...state, comments: comments })),
    on(createCommentSuccess, (state, { comment }) =>
        ({ ...state, comments: [...state.comments, comment] }))

)