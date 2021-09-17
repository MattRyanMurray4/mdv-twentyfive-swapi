import { Action } from '@ngrx/store';

import * as PeopleActions from './people.actions';
import { PeopleEntity } from './people.models';
import { State, initialState, reducer } from './people.reducer';

describe('People Reducer', () => {
  const createPeopleEntity = (id: string, name = ''): PeopleEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid People actions', () => {
    it('loadPeopleSuccess should return the list of known People', () => {
      const people = [
        createPeopleEntity('PRODUCT-AAA'),
        createPeopleEntity('PRODUCT-zzz'),
      ];
      const action = PeopleActions.loadPeopleSuccess({ people });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
