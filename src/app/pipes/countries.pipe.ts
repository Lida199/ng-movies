import { Pipe, PipeTransform } from '@angular/core';
import { AllCountries } from '../model/movies.model';

@Pipe({
  name: 'countriesPipe',
})
export class CountriesPipe implements PipeTransform {
  transform(
    country: AllCountries[] | null,
    countries: (string | null)[] | undefined,
    self: string | null
  ) {
    return country?.filter((x) => {
      if (!countries?.includes(x.name)) {
        return true;
      } else if (x.name === self) {
        return true;
      }
      return false;
    });
  }
}
