import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../model/movies.model';

@Pipe({
  name: 'runtime',
})
export class RuntimePipe implements PipeTransform {
  transform(movies: Movie[]) {
    return movies.reduce((acc, cur) => Number.parseInt(cur.Runtime) + acc, 0);
  }
}
