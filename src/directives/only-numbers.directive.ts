import { Directive,  HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
  standalone: true
})
export class OnlyNumbersDirective {
  constructor() { }

  @HostListener('keypress', ['$event'])
  onInputChange(event: KeyboardEvent) {
    return (/^\d*$/.test(event.key));
  }
}
