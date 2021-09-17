import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { People } from '@swapi/api-interfaces';
import * as PeopleActions from './people.actions';

export const PEOPLE_FEATURE_KEY = 'people';

export interface PeopleState extends EntityState<People> {
  selectedId?: string | number; // which People record has been selected
  loaded: boolean; // has the People list been loaded
  error?: string | null; // last known error (if any)
}

export interface PeopleAction extends Action {
  error: string;
}

export interface PeoplePartialState {
  readonly [PEOPLE_FEATURE_KEY]: PeopleState;
}

export const peopleAdapter: EntityAdapter<People> =
  createEntityAdapter<People>();

export const initialState: PeopleState = peopleAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const setLoading = (state: PeopleState) => ({
  ...state,
  loaded: false,
  error: null,
});

const setFailure = (state: PeopleState, { error }: PeopleAction) => ({
  ...state,
  error,
});

const _peopleReducer = createReducer(
  initialState,
  on(
    PeopleActions.loadPeople,
    PeopleActions.loadPeople,
    PeopleActions.deletePeople,
    setLoading
  ),
  on(
    PeopleActions.loadPeopleFailure,
    PeopleActions.loadPeopleFailure,
    PeopleActions.deletePeopleFailure,
    setFailure
  ),
  on(PeopleActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(PeopleActions.loadPeoplesSuccess, (state, { peoples }) =>
    peopleAdapter.setAll(peoples, { ...state, loaded: true })
  ),

  on(PeopleActions.selectPeople, (state, { peopleId }) => ({
    ...state,
    selectedId: peopleId,
  })),
  on(PeopleActions.loadPeopleSuccess, (state, { people }) =>
    peopleAdapter.upsertOne(people, { ...state, loaded: true })
  ),
  on(PeopleActions.deletePeopleSuccess, (state, { id }) =>
    peopleAdapter.removeOne(id, { ...state, loaded: true })
  )
);

export function peopleReducer(state: PeopleState | undefined, action: Action) {
  return _peopleReducer(state, action);
}
