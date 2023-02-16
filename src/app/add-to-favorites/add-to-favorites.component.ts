import { Component, OnInit } from '@angular/core';
import { MovieInfo } from '../model/movies.model';
import { MoviesApiService } from '../services/movies-api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-to-favorites',
  templateUrl: './add-to-favorites.component.html',
  styleUrls: ['./add-to-favorites.component.scss'],
})
export class AddToFavoritesComponent implements OnInit {
  obj!: MovieInfo | undefined;
  currentRate = 0;

  addToServer(val1: string) {
    if (this.obj) {
      this.moviesApiService
        .saveMovie({ ...this.obj, review: val1, rating: this.currentRate })
        .subscribe(() => {
          this.toastr.success(
            'Movie was successfully added to your list!',
            'Success!'
          );
        });
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3000);
    }
  }

  canceling() {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }

  constructor(
    private moviesApiService: MoviesApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.moviesApiService.movieSubject.subscribe((x) => {
      this.obj = x;
    });
  }
}
