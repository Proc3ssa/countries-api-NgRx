import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AppComponent } from './app/app.component';
import { appReducer } from './app/store/reducers';
import { CountryEffects } from './app/store/effects';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { CountryApiService } from './app/services/country-api.service'; // Explicit import

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStore({ app: appReducer }),
    provideEffects([CountryEffects]),
    provideRouter(routes),
    { provide: CountryApiService, useClass: CountryApiService } // Explicitly provide the service
  ]
}).catch(err => console.error(err));