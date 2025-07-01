import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, CountryState, UiState } from './state.interface';

const selectAppState = createFeatureSelector<AppState>('app');

// Country Selectors
export const selectCountries = createSelector(
  selectAppState,
  (state: AppState) => state.countries.countries
);

export const selectLoading = createSelector(
  selectAppState,
  (state: AppState) => state.countries.loading
);

export const selectError = createSelector(
  selectAppState,
  (state: AppState) => state.countries.error
);

export const selectSelectedCountry = createSelector(
  selectAppState,
  (state: AppState) => state.countries.selectedCountry
);

// UI Selectors
export const selectSearchQuery = createSelector(
  selectAppState,
  (state: AppState) => state.ui.searchQuery
);

export const selectFilterRegion = createSelector(
  selectAppState,
  (state: AppState) => state.ui.filterRegion
);