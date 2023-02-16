import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../services/movies-api.service';
import { Movie, Country, FavoriteMovie } from '../model/movies.model';
import { Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-one',
  templateUrl: './task-one.component.html',
  styleUrls: ['./task-one.component.scss'],
})
export class TaskOneComponent implements OnInit {
  movie$: Observable<Movie> | undefined;
  countries$: Observable<Country[]> | undefined;

  constructor(
    private moviesApiService: MoviesApiService,
    private router: Router
  ) {}

  showButton(val: string) {
    let res: FavoriteMovie | undefined;
    this.moviesApiService.getFavoriteMovies().subscribe((x) => {
      res = x.find((movie) => movie.id === val);
    });
    return Boolean(res);
  }

  searchMovie(movie: string) {
    this.movie$ = this.moviesApiService.getMovie(movie).pipe(
      map((x) => {
        this.countries$ = this.moviesApiService.getCountry(x.Country);
        return x;
      })
    );
  }
  addToFavorites(
    val1: string,
    val2: string,
    val3: string,
    val4: string,
    val5: string,
    val6: string,
    val7: string
  ) {
    this.moviesApiService.sendMovieData({
      id: val1,
      title: val2,
      year: val3,
      actors: val4,
      plot: val5,
      poster: val6,
      countries: val7,
    });
    this.router.navigate(['/add']);
  }

  ngOnInit() {}
}
