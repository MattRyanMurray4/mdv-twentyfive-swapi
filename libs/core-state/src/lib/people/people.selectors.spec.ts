import { PeopleEntity } from './people.models';
import {
  peopleAdapter,
  PeoplePartialState,
  initialState,
} from './people.reducer';
import * as PeopleSelectors from './people.selectors';

describe('People Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPeopleId = (it: PeopleEntity) => it.id;
  const createPeopleEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PeopleEntity);

  let state: PeoplePartialState;

  beforeEach(() => {
    state = {
      people: peopleAdapter.setAll(
        [
          createPeopleEntity('PRODUCT-AAA'),
          createPeopleEntity('PRODUCT-BBB'),
          createPeopleEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('People Selectors', () => {
    it('getAllPeople() should return the list of People', () => {
      const results = PeopleSelectors.getAllPeople(state);
      const selId = getPeopleId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = PeopleSelectors.getSelected(state) as PeopleEntity;
      const selId = getPeopleId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getPeopleLoaded() should return the current "loaded" status', () => {
      const result = PeopleSelectors.getPeopleLoaded(state);

      expect(result).toBe(true);
    });

    it('getPeopleError() should return the current "error" state', () => {
      const result = PeopleSelectors.getPeopleError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
