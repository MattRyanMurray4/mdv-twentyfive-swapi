import { ActionReducerMap } from '@ngrx/store';
import {
  peopleReducer,
  PeopleState,
  PEOPLE_FEATURE_KEY,
} from './people/people.reducer';

export interface AppState {
  [PEOPLE_FEATURE_KEY]: PeopleState;
}

export const reducers: ActionReducerMap<AppState> = {
  [PEOPLE_FEATURE_KEY]: peopleReducer,
};
