import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CountryApiService } from '../services/country-api.service';
import * as actions from './actions';

@Injectable()
export class CountryEffects {
  private actions$ = inject(Actions);
  private apiService = inject(CountryApiService);

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadCountries),
      mergeMap(() => {
        console.log('Inside loadCountries$ effect, apiService:', this.apiService);
        if (!this.apiService) {
          console.error('apiService is undefined in CountryEffects');
          return of(actions.loadCountriesFailure({ error: 'API Service not available' }));
        }
        if (!this.apiService.getAllCountries) {
          console.error('getAllCountries method is undefined on apiService');
          return of(actions.loadCountriesFailure({ error: 'getAllCountries method not available' }));
        }
        return this.apiService.getAllCountries().pipe(
          map(countries => {
            console.log('Fetched countries:', countries);
            return actions.loadCountriesSuccess({ countries });
          }),
          catchError(error => {
            console.error('Error fetching countries:', error);
            return of(actions.loadCountriesFailure({ error: error.message }));
          })
        );
      })
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
}
