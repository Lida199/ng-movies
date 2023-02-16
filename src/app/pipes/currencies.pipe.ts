import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../model/movies.model';

@Pipe({
  name: 'currencies',
})
export class CurrenciesPipe implements PipeTransform {
  transform(country: Country) {
    return country[0].currencies[`${Object.keys(country[0].currencies)[0]}`];
  }
}
