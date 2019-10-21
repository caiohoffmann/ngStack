import { User } from '../../core/models/user.model';
import { createReducer, on } from '@ngrx/store';
import {
    getAll, gotAll,
} from './replies-actions';
import { Reply } from 'src/app/core/models/reply.model';


export interface State {
    replies: Reply[]
}
export const initialState: State = {
    replies: null
};

export const userReducer = createReducer<State>(
    initialState,
    on(getAll, (state) =>
        ({ ...state, replies: state.replies })),
    on(gotAll, (state, { replies }) =>
        ({ ...state, replies: replies })
    ),
    // on(createSuccess, (state, { user }) =>
    //   usersAdapter.addOne(user, state)
    // ),
    // on(updateSuccess, (state, { user }) =>
    //   usersAdapter.updateOne({ id: user.id, changes: user }, state)
    // ),
    // on(removeSuccess, (state, { id }) =>
    //   usersAdapter.removeOne(id, state)
    // )
);