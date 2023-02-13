import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent implements ControlValueAccessor  {

  @Input() options!:  any[];
  suggestions: any [] = [];
  value: string = '';

  onChange: any = () => {}
  onTouch: any = () => {}


  constructor() {}
  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  suggest() {
    this.suggestions = this.options.filter( c => c.label.toUpperCase().includes(this.value.toUpperCase()));
  }

  select(option: any) {
    this.onChange(option);
    this.value = option.label;
    this.suggestions = [];
  }

}
