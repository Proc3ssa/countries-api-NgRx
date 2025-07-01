import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CountryApiService } from '../services/country-api.service';
import * as actions from './actions';

@Injectable()
export class CountryEffects {
  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadCountries),
      mergeMap(() =>
        this.apiService.getAllCountries().pipe(
          map(countries => actions.loadCountriesSuccess({ countries })),
          catchError(error => of(actions.loadCountriesFailure({ error: error.message })))
        )
      )
    )
  );

  loadCountryByCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadCountryByCode),
      mergeMap(action =>
        this.apiService.getCountryByCode(action.code).pipe(
          map(country => actions.selectCountry({ country })),
          catchError(error => of(actions.loadCountriesFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apiService: CountryApiService) {}
}