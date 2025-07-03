# REST Countries Angular Application

## Project Description
This is an Angular application that consumes the REST Countries API to display a list of countries with search and filter capabilities, detailed country information, and theme switching. It follows Angular best practices and uses NgRx for state management.

## Screenshotes
 ![Countries]('./screenshots/all.png')
 ![Country]('./screenshots/country.png')


## Setup & Run Instructions
1. Clone the repository: `git clone https://github.com/proc3ssa/countries-api-NgRx/tree`
2. Navigate to the project directory: `cd countries-api-NgRx/tree`
3. Install dependencies: `npm install`
4. Start the development server: `ng serve`
5. Open `http://localhost:4200` in your browser.

## Application Features
- Search countries by name
- Filter countries by region
- View detailed country information (population, capital, etc.)
- Navigate to border country details
- Toggle between light and dark themes

## Component Structure
- `app-header`: Handles theme toggling
- `country-list`: Displays the country list with search and filter
- `country-details`: Shows detailed country information

## Routing Overview
- `/`: Displays the country list
- `/country/:code`: Displays the country details page

## API Consumption
The app uses the REST Countries API (`https://restcountries.com/v3.1`) via the `CountryApiService` to fetch:
- All independent countries
- Detailed data for a specific country by code
- Multiple countries by codes

## NgRx Store Implementation
- **State:** Managed in `state.interface.ts` with `countries` (countries list, selected country, loading, error) and `ui` (search query, filter region, theme).
- **Actions:** Defined in `actions.ts` (e.g., `loadCountries`, `setSearchQuery`, `toggleTheme`).
- **Reducers:** Implemented in `reducers.ts` to update the state.
- **Effects:** Handled in `effects.ts` for API calls (e.g., `loadCountries$`, `loadCountryByCode$`).
- **Selectors:** Defined in `selectors.ts` to access state slices.

## Theme Switching Implementation
Theme switching is managed via NgRx:
- The `toggleTheme` action toggles between 'light' and 'dark' states.
- The theme is applied reactively to the `body` class based on the store state.

## Git Workflow
- Use a `main` branch for the stable codebase.
- Create feature branches (e.g., `feature/ngrx-integration`) for new features.
- Commit changes with descriptive messages (e.g., "Add country list component").
- Push and create pull requests for review before merging into `main`.