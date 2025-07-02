import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryApiService } from '../../services/country-api.service';
import { Country } from '../../models/country.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterLink],
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  country$: Observable<Country> = of({} as Country);
  error: string | null = null;

  constructor(private route: ActivatedRoute,private router: Router ,private countryApiService: CountryApiService) {}

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code');
    console.log('Fetching country with code:', code); // Debug log for route parameter
    if (code) {
      this.country$ = this.countryApiService.getCountryByCode(code).pipe(
        catchError(error => {
          console.error('Error fetching country details:', error);
          this.error = 'Failed to load country details';
          return of({} as Country); // Return empty object on error
        })
      );
      this.country$.subscribe(country => {
        console.log('Received country data:', country); // Debug log for received data
      });
    } else {
      this.error = 'No country code provided';
      console.error('No code found in route parameters');
    }
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
    window.history.back();
  }

  navigate(cca3: string){

  this.router.navigate(['/country', cca3]);

  //  alert(cca3);

  }
}