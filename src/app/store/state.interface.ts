import { Country } from '../models/country.model';

export interface AppState {
  countries: CountryState;
  ui: UiState;
}

export interface CountryState {
  countries: Country[];
  selectedCountry: Country | null;
  loading: boolean;
  error: string | null;
}

export interface UiState {
  searchQuery: string;
  filterRegion: string;
  theme: 'light' | 'dark';
}