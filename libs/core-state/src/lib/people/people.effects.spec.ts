import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as PeopleActions from './people.actions';
import { PeopleEffects } from './people.effects';

describe('PeopleEffects', () => {
  let actions: Observable<Action>;
  let effects: PeopleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        PeopleEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(PeopleEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: PeopleActions.init() });

      const expected = hot('-a-|', {
        a: PeopleActions.loadPeopleSuccess({ people: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
