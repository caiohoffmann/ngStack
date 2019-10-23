import { User } from '../../core/models/user.model';
import { createReducer, on } from '@ngrx/store';
import {
    getAll, gotAll, createReplySuccess, likeReplySuccess,
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
    on(likeReplySuccess, (state, { reply }) => {
        if (state.replies) {
            for (let rep of state.replies) {
                if (rep._id === reply._id) {
                    state.replies[state.replies.indexOf(rep)] = reply;
                }
            }
            return ({ ...state, replies: [...state.replies] });
        }
        return ({ ...state, replies: null });
    }

    ),
    // on(removeSuccess, (state, { id }) =>
    //   usersAdapter.removeOne(id, state)
    // )
);