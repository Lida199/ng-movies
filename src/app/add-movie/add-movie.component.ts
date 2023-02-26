import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { MyMovie } from '../model/movies.model';
import {
  pastDatesValidator,
  titleValidator,
  countriesValidator,
} from '../app.validator';
import { MoviesApiService } from '../services/movies-api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit {
  today = new Date().toISOString().split('T')[0];
  allCountries$ = this.moviesApiService.getAllCountries();
  isSubmitted = false;

  form = new FormGroup<MyMovie>({
    title: new FormControl(
      null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
      [titleValidator(this.moviesApiService)]
    ),
    countries: new FormArray([new FormControl()], [countriesValidator()]),
    location: new FormControl(null, [Validators.required]),
    releaseDate: new FormControl(null, [
      Validators.required,
      pastDatesValidator(),
    ]),
    genres: new FormControl([], [Validators.required]),
    type: new FormControl(null, [Validators.required]),
    rating: new FormControl(null, [Validators.required]),
  });

  submit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      this.toastr.error('Please check the fields!', 'Error!');
      console.log('The form is not valid', this.form.controls);
    } else {
      this.moviesApiService.addToMyMovies(this.form.value).subscribe(() => {
        this.toastr.success('Movie was successfully added!', 'Success!');
        this.router.navigate(['']);
      });
      console.log('Everything seems ok!');
    }
  }

  addControl() {
    this.form.controls.countries.push(new FormControl());
  }
  deleteControl(index: number) {
    this.form.controls.countries.removeAt(index);
  }
  constructor(
    private fb: FormBuilder,
    private moviesApiService: MoviesApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form.controls.countries.valueChanges.subscribe((val) => {
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
}
