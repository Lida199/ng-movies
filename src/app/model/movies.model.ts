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
