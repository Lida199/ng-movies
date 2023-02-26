import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { MoviesApiService } from './services/movies-api.service';

export function pastDatesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const value = control.value?.split('-');
    if (value) {
      if (value[0] < year) {
        return { invalidDate: true };
      } else if (value[0] == year && value[1] < month) {
        return { invalidDate: true };
      } else if (value[0] == year && value[1] == month && value[2] < date) {
        return { invalidDate: true };
      }
    }
    return null;
  };
}

export function countriesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      control.value.filter((val: string | null) => val !== null).length === 0
    ) {
      return { countryNotSelected: true };
    }
    return null;
  };
}

export function titleValidator(service: MoviesApiService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return service.getMyMoviesTitles().pipe(
      map((x) => x.includes(control.value)),
      map((x) => (x ? { isUsed: true } : null))
    );
  };
}

export function singleTitleValidator(
  service: MoviesApiService,
  title: string
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return service.getMyMoviesTitles().pipe(
      map((x) => {
        const res = x.filter((element) => element !== title);
        return res.includes(control.value);
      }),
      map((x) => (x ? { isUsed: true } : null))
    );
  };
}
