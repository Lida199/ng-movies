import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavoriteMovie } from '../model/movies.model';
import { MoviesApiService } from '../services/movies-api.service';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-favorite',
  templateUrl: './edit-favorite.component.html',
  styleUrls: ['./edit-favorite.component.scss'],
})
export class EditFavoriteComponent implements OnInit {
  @ViewChild('review') review: ElementRef | undefined;
  movieId = this.activatedRoute.snapshot.params['id'];
  movie: FavoriteMovie | undefined;
  editMode = false;
  allMovies$ = this.moviesApiService.getFavoriteMovies().subscribe((x) => {
    x.forEach((movie) => {
      if (movie.id === this.movieId) {
        this.movie = movie;
      }
    });
  });

  setEditMode() {
    this.editMode = true;
  }
  cancelEditMode() {
    this.editMode = false;
  }

  saveEditedReview(id: string, movie: FavoriteMovie) {
    const review = this.review?.nativeElement.value;
    this.moviesApiService
      .editMovie(id, {
        ...movie,
        review,
      })
      .subscribe(() => {
        this.movie!.review = review;
        this.editMode = false;
        this.toastr.success('Your review has been updated!', 'Success!');
      });
  }

  changingScore(id: string, movie: FavoriteMovie, ratingAmount: number) {
    const rating = ratingAmount;
    this.moviesApiService
      .editMovie(id, {
        ...movie,
        rating,
      })
      .subscribe();
  }

  deleteMovie(value: string) {
    this.toastr.success('Movie has been removed from Favourites!', 'Success!');
    this.moviesApiService
      .deleteMovie(value)
      .pipe(delay(2000))
      .subscribe(() => this.router.navigate(['/favorite-movies']));
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesApiService: MoviesApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
