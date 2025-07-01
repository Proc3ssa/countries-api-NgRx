import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountryListComponent } from './components/country-list/country-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CountryListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rest-countries-lab';
}
