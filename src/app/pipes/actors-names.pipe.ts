import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actorsNames',
})
export class ActorsNamesPipe implements PipeTransform {
  transform(actors: string) {
    return actors
      .split(', ')
      .map((actor) => actor.slice(0, actor.indexOf(' ')))
      .join(', ');
  }
}
