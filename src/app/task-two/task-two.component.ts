import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, pipe, map } from 'rxjs';
import { MoviesApiService } from '../services/movies-api.service';
import { Movie, Country } from '../model/movies.model';

@Component({
  selector: 'app-task-two',
  templateUrl: './task-two.component.html',
  styleUrls: ['./task-two.component.scss'],
})
export class TaskTwoComponent implements OnInit {
  movies$: Observable<Movie[]> | undefined;
  countries: string = '';
  countries$: Observable<Country[]> | undefined;
  constructor(private movieApiService: MoviesApiService) {}

  results(value1: string, value2: string, value3: string) {
    if (value1 && value2 && value3) {
      this.countries = '';
      this.movies$ = forkJoin([
        this.movieApiService.getMovie(value1).pipe(
          map((x) => {
            this.countries += `${x.Country}, `;
            return x;
          })
        ),
        this.movieApiService.getMovie(value2).pipe(
          map((x) => {
            this.countries += `${x.Country}, `;
            return x;
          })
        ),
        this.movieApiService.getMovie(value3).pipe(
          map((x) => {
            this.countries += `${x.Country}`;
            this.countries$ = this.movieApiService.getCountry(this.countries);
            return x;
          })
        ),
      ]);
    } else {
      console.log('please provide all countries');
    }
  }
  ngOnInit() {}
}
