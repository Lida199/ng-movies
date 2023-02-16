import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flags',
})
export class FlagsPipe implements PipeTransform {
  constructor() {}
  transform(code: string) {
    return `https://flagpedia.net/data/flags/icon/36x27/${code.toLowerCase()}.png`;
  }
}
