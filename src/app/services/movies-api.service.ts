import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, BehaviorSubject, Subject, map } from 'rxjs';
import { MOVIE_API_BASE, COUNTRY_API_BASE } from '../tokens';
import {
  Movie,
  Country,
  FavoriteMovie,
  MovieInfo,
  MyMovie,
  MyData,
  AllCountries,
} from '../model/movies.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  constructor(
    private http: HttpClient,
    @Inject(MOVIE_API_BASE) private movieApiBase: string,
    @Inject(COUNTRY_API_BASE) private countryApiBase: string
  ) {}

  getMovie(movie: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.movieApiBase}${movie}`);
  }

  getCountry(country: string): Observable<Country[]> {
    const result: Observable<Country>[] = [];
    const countries = country.split(', ').forEach((country) => {
      result.push(
        this.http.get<Country>(`${this.countryApiBase}${country}?fullText=true`)
      );
    });
    return forkJoin(result);
  }

  movieSubject = new BehaviorSubject<MovieInfo | undefined>(undefined);

  sendMovieData(data: MovieInfo) {
    this.movieSubject.next(data);
  }

  saveMovie(movie: FavoriteMovie) {
    return this.http.post(
      `${environment.jsonServerBase}/favoriteMovies`,
      movie
    );
  }

  editMovie(id: string, movie: FavoriteMovie) {
    return this.http.patch(
      `${environment.jsonServerBase}/favoriteMovies/${id}`,
      movie
    );
  }
  deleteMovie(id: string) {
    return this.http.delete(
      `${environment.jsonServerBase}/favoriteMovies/${id}`
    );
  }

  getFavoriteMovies(): Observable<FavoriteMovie[]> {
    return this.http.get<FavoriteMovie[]>(
      `${environment.jsonServerBase}/favoriteMovies`
    );
  }

  getMyMovies(): Observable<MyData[]> {
    return this.http.get<MyData[]>(`${environment.jsonServerBase}/myMovies`);
  }

  editMyMovie(id: number, movie: object) {
    return this.http.put(`${environment.jsonServerBase}/myMovies/${id}`, movie);
  }

  getMyMoviesTitles(): Observable<string[]> {
    return this.getMyMovies().pipe(map((x) => x.map((el) => el.title)));
  }

  getAllCountries(): Observable<AllCountries[]> {
    return this.http.get<AllCountries[]>('https://restcountries.com/v2/all');
  }
  addToMyMovies(data: object) {
    return this.http.post(`${environment.jsonServerBase}/myMovies`, data);
  }
}
