import { createReducer, on } from '@ngrx/store';
import { AppState, CountryState, UiState } from './state.interface';
import * as actions from './actions';

const initialCountryState: CountryState = {
  countries: [],
  selectedCountry: null,
  loading: false,
  error: null
};

const initialUiState: UiState = {
  searchQuery: '',
  filterRegion: '',
  theme: 'light'
};

const countryReducer = createReducer(
  initialCountryState,
  on(actions.loadCountries, state => ({ ...state, loading: true, error: null })),
  on(actions.loadCountriesSuccess, (state, { countries }) => ({
    ...state,
    countries,
    loading: false
  })),
  on(actions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(actions.selectCountry, (state, { country }) => ({
    ...state,
    selectedCountry: country
  })),
  on(actions.loadCountryByCode, state => ({ ...state, loading: true, error: null }))
);

const uiReducer = createReducer(
  initialUiState,
  on(actions.setSearchQuery, (state, { query }) => ({ ...state, searchQuery: query })),
  on(actions.setFilterRegion, (state, { region }) => ({ ...state, filterRegion: region })),
  on(actions.toggleTheme, state => {
    const newTheme: 'light' | 'dark' = state.theme === 'light' ? 'dark' : 'light';
    return { ...state, theme: newTheme };
  })
);

export function appReducer(state: AppState | undefined, action: any): AppState {
  return {
    countries: countryReducer(state ? state.countries : initialCountryState, action),
    ui: uiReducer(state ? state.ui : initialUiState, action)
  };
}