import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../../models/country.model';
import { AppState } from '../../store/state.interface';
import * as actions from '../../store/actions';
import { selectCountries, selectLoading, selectError, selectSearchQuery, selectFilterRegion } from '../../store/selectors';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit, OnDestroy {
  private store = inject(Store<AppState>);
  private subscriptions: Subscription = new Subscription();

  countries$: Observable<Country[]> = this.store.select(selectCountries);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);
  searchQuery$: Observable<string> = this.store.select(selectSearchQuery);
  filterRegion$: Observable<string> = this.store.select(selectFilterRegion);
  filteredCountries$: Observable<Country[]>;

  constructor(private router: Router) {
    this.filteredCountries$ = combineLatest([this.countries$, this.searchQuery$, this.filterRegion$]).pipe(
      map(([countries, searchQuery, filterRegion]) => {
        let filtered = [...countries];
        if (searchQuery) {
          filtered = filtered.filter(country =>
            country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        if (filterRegion) {
          filtered = filtered.filter(country => country.region === filterRegion);
        }
        return filtered;
      })
    );
  }

  ngOnInit() {
    this.store.dispatch(actions.loadCountries());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
    this.router.navigate(['country', country.cca3]);
  }
}