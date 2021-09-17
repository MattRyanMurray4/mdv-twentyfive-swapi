import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as PeopleActions from './people.actions';
import { PeopleEffects } from './people.effects';
import { PeopleFacade } from './people.facade';
import { PeopleEntity } from './people.models';
import {
  PEOPLE_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './people.reducer';
import * as PeopleSelectors from './people.selectors';

interface TestSchema {
  people: State;
}

describe('PeopleFacade', () => {
  let facade: PeopleFacade;
  let store: Store<TestSchema>;
  const createPeopleEntity = (id: string, name = ''): PeopleEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(PEOPLE_FEATURE_KEY, reducer),
          EffectsModule.forFeature([PeopleEffects]),
        ],
        providers: [PeopleFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(PeopleFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allPeople$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allPeople$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadPeopleSuccess` to manually update list
     */
    it('allPeople$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allPeople$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        PeopleActions.loadPeopleSuccess({
          people: [createPeopleEntity('AAA'), createPeopleEntity('BBB')],
        })
      );

      list = await readFirst(facade.allPeople$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
