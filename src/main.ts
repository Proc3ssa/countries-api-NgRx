import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AppComponent } from './app/app.component';
import { appReducer } from './app/store/reducers';
import { CountryEffects } from './app/store/effects';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Ensure this file exists or create it

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStore({ app: appReducer }),
    provideEffects([CountryEffects]),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));