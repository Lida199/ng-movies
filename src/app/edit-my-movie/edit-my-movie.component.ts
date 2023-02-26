import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesApiService } from '../services/movies-api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MyData, MyMovie2 } from '../model/movies.model';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import {
  pastDatesValidator,
  countriesValidator,
  singleTitleValidator,
} from '../app.validator';

@Component({
  selector: 'app-edit-my-movie',
  templateUrl: './edit-my-movie.component.html',
  styleUrls: ['./edit-my-movie.component.scss'],
})
export class EditMyMovieComponent implements OnInit {
  allCountries$ = this.moviesApiService.getAllCountries();
  today = new Date().toISOString().split('T')[0];
  movieId = this.activatedRoute.snapshot.params['id'];
  movie: MyData | undefined;
  allMovies$ = this.moviesApiService.getMyMovies().subscribe((x) => {
    x.forEach((movie) => {
      if (movie.id == this.movieId) {
        this.movie = movie;
        this.form.controls.title.setValue(movie.title);
        this.form.controls.releaseDate.setValue(movie.releaseDate);
        this.form.controls.genres.setValue(movie.genres);
        this.form.controls.type.setValue(movie.type);
        this.form.controls.rating.setValue(movie.rating);
        this.form.controls.title.setAsyncValidators(
          singleTitleValidator(this.moviesApiService, movie.title)
        );
        const controls: FormControl<string | null>[] = movie.countries.map(
          (country: string) => new FormControl(country)
        );
        this.form.setControl('countries', new FormArray(controls));
        if (movie.location) {
          this.form.controls.location?.setValue(movie.location);
        } else {
          this.form.controls.location?.disable();
        }
        if (movie.duration) {
          this.form.addControl(
            'duration',
            new FormControl(movie.duration, [
              Validators.required,
              Validators.min(60),
              Validators.max(190),
            ])
          );
        } else if (movie.seriesAmount) {
          this.form.addControl(
            'seriesAmount',
            new FormControl(movie.seriesAmount, [Validators.required])
          );
        }
        this.form.controls.countries?.valueChanges.subscribe((val) => {
          console.log('hello');
          this.allCountries$.subscribe((countries) => {
            let result = false;
            countries.forEach((country) => {
              if (val?.includes(country.name)) {
                if (country.population < 50000000) {
                  result = true;
                }
              }
              if (result) {
                this.form.controls.location?.disable();
              } else {
                this.form.controls.location?.enable();
              }
            });
          });
        });

        this.form.controls.type.valueChanges.subscribe((val) => {
          if (val === 'Movie') {
            this.form.addControl(
              'duration',
              new FormControl(null, [
                Validators.required,
                Validators.min(60),
                Validators.max(190),
              ])
            );
            this.form.removeControl('seriesAmount');
          } else if (val === 'TV Show') {
            this.form.addControl(
              'seriesAmount',
              new FormControl(null, [Validators.required])
            );
            this.form.removeControl('duration');
          }
        });
      }
    });
  });
  cancel() {
    this.toastr.success('You have canceled the edit mode!', 'Success');
    this.router.navigate(['/my-movies']);
  }
  edit(val: number) {
    if (this.form.invalid) {
      this.toastr.error('Please check the fields!', 'Error!');
    } else {
      this.moviesApiService
        .editMyMovie(val, { ...this.form.value, id: val })
        .subscribe(() => {
          this.toastr.success(
            'The fields have been successfully updated!',
            'Success!'
          );
          this.router.navigate(['/my-movies']);
        });
    }
  }

  form = new FormGroup<MyMovie2>({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    location: new FormControl(null, [Validators.required]),
    releaseDate: new FormControl(null, [
      Validators.required,
      pastDatesValidator(),
    ]),
    genres: new FormControl([], [Validators.required]),
    type: new FormControl(null, [Validators.required]),
    rating: new FormControl(null, [Validators.required]),
  });

  addControl() {
    if (this.form.controls.countries) {
      this.form.controls.countries.push(new FormControl());
    }
  }
  deleteControl(index: number) {
    if (this.form.controls.countries) {
      this.form.controls?.countries.removeAt(index);
    }
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesApiService: MoviesApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
