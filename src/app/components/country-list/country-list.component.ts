import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, CountryState, UiState } from '../../store/state.interface';
import { Observable } from 'rxjs';
import { Country } from '../../models/country.model';
import * as actions from '../../store/actions';
import { selectCountries, selectLoading, selectError } from '../../store/selectors';
import { selectSearchQuery, selectFilterRegion } from '../../store/selectors';
import { combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  countries$: Observable<Country[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  searchQuery$: Observable<string>;
  filterRegion$: Observable<string>;
  filteredCountries: Country[] = [];

  constructor(private store: Store<{ app: AppState }>) {
    this.countries$ = this.store.select(selectCountries);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.searchQuery$ = this.store.select(selectSearchQuery);
    this.filterRegion$ = this.store.select(selectFilterRegion);
  }

  ngOnInit() {
    this.store.dispatch(actions.loadCountries());
    combineLatest([this.countries$, this.searchQuery$, this.filterRegion$]).subscribe(
      ([countries, searchQuery, filterRegion]) => {
        this.filterCountries(countries, searchQuery, filterRegion);
      }
    );
  }

  filterCountries(countries: Country[], searchQuery: string, filterRegion: string) {
    let filtered = [...countries];
    if (searchQuery) {
      filtered = filtered.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterRegion) {
      filtered = filtered.filter(country => country.region === filterRegion);
    }
    this.filteredCountries = filtered;
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.store.dispatch(actions.setSearchQuery({ query }));
  }

  onFilter(event: Event) {
    const region = (event.target as HTMLSelectElement).value;
    this.store.dispatch(actions.setFilterRegion({ region }));
  }

  onCountrySelect(country: Country) {
    this.store.dispatch(actions.selectCountry({ country }));
    // Navigation to details will be added later
  }
}