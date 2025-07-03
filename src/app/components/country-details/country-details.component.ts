import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Country } from '../../models/country.model';
import { AppState } from '../../store/state.interface';
import * as actions from '../../store/actions';
import { selectSelectedCountry, selectLoading, selectError } from '../../store/selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterLink],
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
  private store = inject(Store<AppState>);
  private subscriptions: Subscription = new Subscription();

  selectedCountry$: Observable<Country | null> = this.store.select(selectSelectedCountry);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);
  private code: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.code = this.route.snapshot.paramMap.get('code');
  }

  ngOnInit() {
    this.subscriptions.add(
      this.selectedCountry$.subscribe(country => {
        if (this.code && !country) {
          this.store.dispatch(actions.loadCountryByCode({ code: this.code }));
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getNativeName(country: Country): string {
    if (!country.name?.nativeName || Object.keys(country.name.nativeName).length === 0) return 'N/A';
    const firstLanguageCode = Object.keys(country.name.nativeName)[0];
    return country.name.nativeName[firstLanguageCode]?.common || 'N/A';
  }

  getCurrencyNames(currencies: { [code: string]: { name: string; symbol: string } } | undefined): string {
    if (!currencies) return 'N/A';
    return Object.values(currencies).map(c => `${c.name} (${c.symbol})`).join(', ');
  }

  getLanguageNames(languages: { [code: string]: string } | undefined): string {
    if (!languages) return 'N/A';
    return Object.values(languages).join(', ');
  }

  goBack() {
    this.router.navigate(['/']);
  }

  navigate(cca3: string) {
    this.store.dispatch(actions.loadCountryByCode({ code: cca3 }));
    this.router.navigate(['/country', cca3]);
  }
}