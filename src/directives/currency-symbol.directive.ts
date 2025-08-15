import { Directive, ElementRef, HostListener, Input, Renderer2, inject } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
  selector: '[appCurrencySymbol]',
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CurrencySymbolDirective,
    multi: true
  }]
})
export class CurrencySymbolDirective implements ControlValueAccessor {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @Input() symbol: string = '$';
  @Input() position: 'prefix' | 'suffix' = 'prefix'; // Позиция символа

  private onChange: any = () => {
  };
  private onTouched: any = () => {
  };
  private isFocused: boolean = false;

  writeValue(value: any): void {
    if (value != null && !this.isFocused) {
      this.renderer.setProperty(this.el.nativeElement, 'value', this.formatValue(value));
    } else {
      this.renderer.setProperty(this.el.nativeElement, 'value', value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled);
  }

  @HostListener('focus') onFocus() {
    this.isFocused = true;
    const value = this.el.nativeElement.value;
    const numericValue = this.parseValue(value);
    this.renderer.setProperty(this.el.nativeElement, 'value', numericValue);
  }

  @HostListener('blur') onBlur() {
    this.isFocused = false;
    const value = this.el.nativeElement.value;
    const numericValue = this.parseValue(value);
    this.onChange(numericValue);
    this.renderer.setProperty(this.el.nativeElement, 'value', this.formatValue(numericValue));
    this.onTouched();
  }

  @HostListener('input', ['$event.target.value']) onInput(value: string) {
    const numericValue = this.parseValue(value);
    this.onChange(numericValue);
  }

  private formatValue(value: any): string {
    if (value == null || value === '') return '';
    return this.position === 'prefix' ? `${this.symbol}${value}` : `${value}${this.symbol}`;
  }

  private parseValue(value: string): number | null {
    if (!value) return null;
    let numeric = value.replace(this.symbol, '').trim();
    numeric = this.position === 'prefix' ? numeric : numeric.replace(this.symbol, '').trim();
    const parsed = parseFloat(numeric);
    return isNaN(parsed) ? null : parsed;
  }
}
