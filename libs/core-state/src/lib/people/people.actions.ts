import { createAction, props } from '@ngrx/store';
import { People } from '@swapi/api-interfaces';

export const init = createAction('[People Page] Init');

// all

export const loadPeoples = createAction('[People] Load All People');

export const loadPeoplesSuccess = createAction(
  '[People] Loaded People Success',
  props<{ peoples: People[] }>()
);

export const loadPeoplesFailure = createAction(
  '[People] Loaded People Failure',
  props<{ error: any }>()
);

// select

export const selectPeople = createAction(
  '[People] Select A People',
  props<{ peopleId: string }>()
);

// singular

export const loadPeople = createAction(
  '[People] Load A People',
  props<{ id: string }>()
);
export const loadPeopleSuccess = createAction(
  '[People] Loaded People Success',
  props<{ people: People }>()
);
export const loadPeopleFailure = createAction(
  '[People] Loaded People Failure',
  props<{ error: any }>()
);

// delete

export const deletePeople = createAction(
  '[People] Delete A People',
  props<{ people: People }>()
);
export const deletePeopleSuccess = createAction(
  '[People] Deleted A People Success',
  props<{ id: string }>()
);
export const deletePeopleFailure = createAction(
  '[People] Deleted People Failure',
  props<{ error: any }>()
);
