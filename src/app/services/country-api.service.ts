import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryApiService {
  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/all`).pipe(
      catchError(error => {
        console.error('Error fetching countries:', error);
        return of([]);
      })
    );
  }

  getCountryByCode(code: string): Observable<Country> {
    return this.http.get<Country>(`${this.apiUrl}/alpha/${code}`).pipe(
      catchError(error => {
        console.error(`Error fetching country ${code}:`, error);
        return of({} as Country);
      })
    );
  }

  getCountriesByCodes(codes: string[]): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha?codes=${codes.join(',')}`).pipe(
      catchError(error => {
        console.error('Error fetching multiple countries:', error);
        return of([]);
      })
    );
  }
}