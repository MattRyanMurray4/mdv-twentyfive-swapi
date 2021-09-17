import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { People } from '@swapi/api-interfaces';
import * as PeopleActions from './people.actions';
import * as PeopleSelectors from './people.selectors';

@Injectable()
export class PeopleFacade {
  loaded$ = this.store.pipe(select(PeopleSelectors.getPeopleLoaded));
  allPeople$ = this.store.pipe(select(PeopleSelectors.getAllPeople));
  selectedPeople$ = this.store.pipe(select(PeopleSelectors.getSelected));

  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(PeopleActions.init());
  }

  loadPeoples() {
    return this.store.dispatch(PeopleActions.loadPeoples());
  }

  loadPeople(id: string) {
    return this.store.dispatch(PeopleActions.loadPeople({ id }));
  }

  selectPeople(peopleId: string) {
    return this.store.dispatch(PeopleActions.selectPeople({ peopleId }));
  }

  deletePeople(people: People) {
    return this.store.dispatch(PeopleActions.deletePeople({ people }));
  }

  private dispatch(action: Action) {
    return this.store.dispatch(action);
  }
}
