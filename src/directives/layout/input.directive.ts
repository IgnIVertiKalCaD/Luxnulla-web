import { Directive, ElementRef, inject } from "@angular/core";
import {FormControl, NgControl} from "@angular/forms";

@Directive({
  selector: 'input[appInput]',
  standalone: true,
})
export class InputDirective {
  el = inject(ElementRef);
  ngControl = inject(NgControl, { optional: true });


  get control(): FormControl {
    if(!this.ngControl) {
      console.error("Control is required");
      return new FormControl()
    }
    return this.ngControl.control as FormControl;
  }
}
