import { createAction, props } from '@ngrx/store';
import { Country } from '../models/country.model';

// Country Actions
export const loadCountries = createAction('[Country] Load Countries');
export const loadCountriesSuccess = createAction(
  '[Country] Load Countries Success',
  props<{ countries: Country[] }>()
);
export const loadCountriesFailure = createAction(
  '[Country] Load Countries Failure',
  props<{ error: string }>()
);
export const selectCountry = createAction(
  '[Country] Select Country',
  props<{ country: Country }>()
);
export const loadCountryByCode = createAction(
  '[Country] Load Country By Code',
  props<{ code: string }>()
);

// UI Actions
export const setSearchQuery = createAction(
  '[UI] Set Search Query',
  props<{ query: string }>()
);
export const setFilterRegion = createAction(
  '[UI] Set Filter Region',
  props<{ region: string }>()
);
export const toggleTheme = createAction('[UI] Toggle Theme');