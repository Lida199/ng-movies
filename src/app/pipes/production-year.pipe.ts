import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productionYear',
})
export class ProductionYearPipe implements PipeTransform {
  transform(year: string) {
    if (new Date().getFullYear() - Number.parseInt(year) == 0) {
      return 'Movie was released this year';
    } else if (new Date().getFullYear() - Number.parseInt(year) == 1) {
      return 'Movie was released last year';
    } else
      return `Movie was released ${
        new Date().getFullYear() - Number.parseInt(year)
      } years ago`;
  }
}
