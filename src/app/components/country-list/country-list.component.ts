import { Component, OnInit } from '@angular/core';
import { CountryApiService } from '../../services/country-api.service';
import { Observable, of } from 'rxjs';
import { Country } from '../../models/country.model';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  countries$: Observable<Country[]> = of([]);
  loading = false;
  error: string | null = null;
  filteredCountries: Country[] = [];
  searchQuery: string = '';
  filterRegion: string = '';
  private countries: Country[] = []; // Store the raw countries data

  constructor(private countryApiService: CountryApiService, private router: Router) {}


  ngOnInit() {
    this.loading = true;
    this.countries$ = this.countryApiService.getAllCountries().pipe(
      catchError(error => {
        console.error('Error fetching countries:', error);
        this.error = 'Failed to load countries';
        this.loading = false;
        return of([]);
      })
    );
    this.countries$.subscribe(countries => {
      this.loading = false;
      this.countries = countries; // Store the raw data
      this.filterCountries(this.countries); // Initial filter
    });
  }

  filterCountries(countries: Country[]) {
    let filtered = [...countries];
    if (this.searchQuery) {
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    if (this.filterRegion) {
      filtered = filtered.filter(country => country.region === this.filterRegion);
    }
    this.filteredCountries = filtered;
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery = query;
    this.filterCountries(this.countries); // Filter using the stored countries
  }

  onFilter(event: Event) {
    const region = (event.target as HTMLSelectElement).value;
    this.filterRegion = region;
    this.filterCountries(this.countries); // Filter using the stored countries
  }

  onCountrySelect(country: Country) {
    this.router.navigate(['country', country.cca3]);
  }

}