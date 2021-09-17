import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootStoreConfig, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPeople from './people/people.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PeopleEffects } from './people/people.effects';
import { PeopleFacade } from './people/people.facade';
import { reducers } from '.';

const storeConfig: RootStoreConfig<any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true,
  },
};

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([PeopleEffects]),
    StoreDevtoolsModule.instrument({ name: 'SWAPI-App' }),
  ],
  providers: [PeopleFacade],
})
export class CoreStateModule {}
