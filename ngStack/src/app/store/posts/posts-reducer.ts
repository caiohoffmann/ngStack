import { User } from '../../core/models/user.model';
import { createReducer, on } from '@ngrx/store';
import {
    getAll, gotAll, createPost
} from './posts-actions';
import { Post } from '../../core/models/post.model';
import { state } from '@angular/animations';


export interface State {
    posts: Post[]
}
export const initialState: State = {
    posts: null
};

export const postsReducer = createReducer<State>(
    initialState,
    on(getAll, (state) =>
        ({ ...state, posts: state.posts })),
    on(gotAll, (state, { posts }) =>
        ({ ...state, posts: posts })),
    on(createPost, (state, { post }) =>
        ({ ...state, posts: { ...state.posts, post } }))
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