import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PeopleService } from '@swapi/core-data';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  deletePeople,
  deletePeopleFailure,
  deletePeopleSuccess,
  loadPeoples,
  loadPeoplesFailure,
  loadPeoplesSuccess,
  loadPeople,
  loadPeopleFailure,
  loadPeopleSuccess,
} from './people.actions';

@Injectable()
export class PeopleEffects {
  loadPeoples$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPeople),
      switchMap(() =>
        this.peopleService.all().pipe(
          tap(console.log),
          map((people) => loadPeopleSuccess({ people })),
          catchError((error) => of(loadPeopleFailure({ error })))
        )
      )
    )
  );

  loadPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPeople),
      switchMap(({ id }) =>
        this.peopleService.find(id).pipe(
          map((people) => loadPeopleSuccess({ people })),
          catchError((error) => of(loadPeopleFailure({ error })))
        )
      )
    )
  );

  deletePeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePeople),
      switchMap(({ people }) =>
        this.peopleService.delete(people.id).pipe(
          map((id) => deletePeopleSuccess({ id })),
          catchError((error) => of(deletePeopleFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private peopleService: PeopleService
  ) {}
}
