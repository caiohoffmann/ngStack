import * as fromUsers from './users-reducer';
import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

export interface UsersState {
  user: fromUsers.State;
}

/** Provide reducers with AoT-compilation compliance */
export function reducers(state: UsersState | undefined, action: Action) {
  return combineReducers({
    user: fromUsers.reducer
  })(state, action)
}


/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */

export const getUsersState = createFeatureSelector<UsersState>('Users');

export const getUsersEntitiesState = createSelector(
  getUsersState,
  state => state.user
);
