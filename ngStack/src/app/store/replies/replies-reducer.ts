import { User } from '../../core/models/user.model';
import { createReducer, on } from '@ngrx/store';
import {
    getAll, gotAll, createReplySuccess,
} from './replies-actions';
import { Reply } from 'src/app/core/models/reply.model';


export interface State {
    replies: Reply[]
}
export const initialState: State = {
    replies: null
};

export const replyReducer = createReducer<State>(
    initialState,
    on(getAll, (state) =>
        ({ ...state, replies: state.replies })),
    on(gotAll, (state, { replies }) =>
        ({ ...state, replies: replies })
    ),
    on(createReplySuccess, (state, { reply }) =>
        ({ ...state, replies: { ...state.replies, reply } })
    ),
    // on(updateSuccess, (state, { user }) =>
    //   usersAdapter.updateOne({ id: user.id, changes: user }, state)
    // ),
    // on(removeSuccess, (state, { id }) =>
    //   usersAdapter.removeOne(id, state)
    // )
);