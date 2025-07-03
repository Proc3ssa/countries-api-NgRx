export interface Country {
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  topLevelDomain: string[];
  currencies: { code: string; name: string; symbol: string }[];
  languages: { iso639_1: string; iso639_2: string; name: string; nativeName: string }[];
  borders: string[];
  alpha3Code: string;
}