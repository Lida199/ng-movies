import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../model/movies.model';

@Pipe({
  name: 'population',
})
export class PopulationPipe implements PipeTransform {
  transform(countries: Country[]) {
    return countries.reduce((acc, cur) => acc + cur[0].population, 0);
  }
}
