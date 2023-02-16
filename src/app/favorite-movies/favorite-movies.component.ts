import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../services/movies-api.service';
@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss'],
})
export class FavoriteMoviesComponent implements OnInit {
  allMovies$ = this.moviesApiService.getFavoriteMovies();
  constructor(private moviesApiService: MoviesApiService) {}
  ngOnInit(): void {}
}
