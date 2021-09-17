import { createFeatureSelector, createSelector } from '@ngrx/store';
import { emptyPeople, People } from '@swapi/api-interfaces';
import {
  PEOPLE_FEATURE_KEY,
  PeopleState,
  peopleAdapter,
} from './people.reducer';

// Lookup the 'People' feature state managed by NgRx
export const getPeopleState =
  createFeatureSelector<PeopleState>(PEOPLE_FEATURE_KEY);

const { selectAll, selectEntities } = peopleAdapter.getSelectors();

export const getPeopleLoaded = createSelector(
  getPeopleState,
  (state: PeopleState) => state.loaded
);

export const getPeopleError = createSelector(
  getPeopleState,
  (state: PeopleState) => state.error
);

export const getAllPeople = createSelector(
  getPeopleState,
  (state: PeopleState) => selectAll(state)
);

export const getPeopleEntities = createSelector(
  getPeopleState,
  (state: PeopleState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getPeopleState,
  (state: PeopleState) => state.selectedId
);

export const getSelected = createSelector(
  getPeopleEntities,
  getSelectedId,
  (entities, selectedId) =>
    (selectedId ? entities[selectedId] : emptyPeople) as People
);
