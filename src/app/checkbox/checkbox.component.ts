import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {
  genres = ['Drama', 'Horror', 'Comedy', 'Action', 'Romance'];
  results: string[] = [];
  @Input() start: string[] = [];

  changeValue(event: Event) {
    const element = event.target as HTMLInputElement;
    this.results = this.start;
    if (element.checked) {
      this.results.push(element.value);
    } else {
      const index = this.results.findIndex((x) => x === element.value);
      this.results.splice(index, 1);
    }
    this.onChange(this.results);
  }
  makeChecked(genre: string) {
    let final = false;
    this.start.forEach((val) => {
      if (val === genre) {
        final = true;
      }
    });
    return final;
  }

  onChange: (genres: string[]) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(genres: string[]) {
    this.results = genres;
    this.onChange(genres);
  }
  registerOnChange(fn: (genres: string[]) => void) {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
  constructor() {}
  ngOnInit(): void {}
}
