import * as fromUsers from './users/users-reducer';
import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

// export interface AppState {
//   // user: fromUsers.State;
//   // reply: fromReplies.State,
//   posts: fromPosts.State
// }

// /** Provide reducers with AoT-compilation compliance */
// export function reducers(state: AppState | undefined, action: Action) {
//   return combineReducers({
//     // user: fromUsers.userReducer,
//     // reply: fromReplies.replyReducer,
//     posts: fromPosts.postReducer
//   })(state, action)
// }


// /**
//  * The createFeatureSelector function selects a piece of state from the root of the state object.
//  * This is used for selecting feature states that are loaded eagerly or lazily.
//  */

// export const getUsersState = createFeatureSelector<AppState>('Users');


// export const getUsersEntitiesState = createSelector(
//   getUsersState,
//   state => state.user
// );
