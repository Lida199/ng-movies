import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../services/movies-api.service';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.scss'],
})
export class MyMoviesComponent implements OnInit {
  myMovies$ = this.moviesApiService.getMyMovies();
  constructor(private moviesApiService: MoviesApiService) {}
  ngOnInit(): void {}
}
