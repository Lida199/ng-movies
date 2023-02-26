import { FormControl, FormArray } from '@angular/forms';

export interface Movie {
  Title: string;
  Year: string;
  Actors: string;
  Country: string;
  Poster: string;
  Plot: string;
  Runtime: string;
  imdbID: string;
}

export type Country = Array<{
  currencies: any;
  cca2: string;
  name: {
    common: string;
  };
  population: number;
}>;

export interface MovieInfo {
  id: string;
  title: string;
  year: string;
  actors: string;
  plot: string;
  poster: string;
  countries: string;
}

export interface FavoriteMovie {
  id: string;
  title: string;
  year: string;
  actors: string;
  plot: string;
  poster: string;
  countries: string;
  review: string;
  rating: number;
}

export interface MyMovie {
  title: FormControl<string | null>;
  countries: FormArray<FormControl<string | null>>;
  releaseDate: FormControl<string | null>;
  genres: FormControl<string[] | null>;
  type: FormControl<string | null>;
  duration?: FormControl<number | null>;
  seriesAmount?: FormControl<number | null>;
  rating: FormControl<number | null>;
  location?: FormControl<string | null>;
}

export interface MyData {
  title: string;
  genres: string[];
  countries: string[];
  rating: number;
  releaseDate: string;
  seriesAmount?: number;
  duration?: number;
  type: string;
  location?: string;
  id: number;
}

export interface AllCountries {
  name: string;
  population: number;
}

export interface MyMovie2 {
  title: FormControl<string | null>;
  countries?: FormArray<FormControl<string | null>>;
  releaseDate: FormControl<string | null>;
  genres: FormControl<string[] | null>;
  type: FormControl<string | null>;
  duration?: FormControl<number | null>;
  seriesAmount?: FormControl<number | null>;
  rating: FormControl<number | null>;
  location: FormControl<string | null>;
}
