import {Component, Input} from '@angular/core';
import {TextFieldComponent} from "@/components/inputs/text-field/text-field.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {InputDirective} from "@/directives/layout/input.directive";
import {Icon_rightDirective} from "@/directives/layout/icon_right.directive";
import {DateRangeInputComponent} from "@/ui-kit/inputs/date-range-input/date-range-input.component";

@Component({
  selector: 'app-input-date-range-select',
  standalone: true,
  imports: [
    TextFieldComponent,
    Icon_rightDirective,
    ReactiveFormsModule,
    InputDirective,
    DateRangeInputComponent
  ],
  templateUrl: './input-date-range-select.component.html',
  styleUrl: './input-date-range-select.component.scss'
})
export class InputDateRangeSelectComponent {

  @Input()
  dateFormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  })

  onSelectDateRange(event: {start: Date, end: Date}) {
    this.dateFormGroup.controls.start.setValue(event.start)
    this.dateFormGroup.controls.end.setValue(event.end)
  }

}
