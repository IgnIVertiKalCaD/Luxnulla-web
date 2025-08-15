import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, inject } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from "@angular/forms";

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCheckboxComponent),
      multi: true
    }
  ],
  imports: [
    ReactiveFormsModule,
  ]
})
export class InputCheckboxComponent implements ControlValueAccessor {
  private readonly cdr = inject(ChangeDetectorRef);


  @Input() formControlName?: string | null = null;

  isChecked: boolean = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.isChecked = value;

    this.cdr.detectChanges()
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(): void {
    this.writeValue(!this.isChecked);

    this.onChange(this.isChecked);
    this.onTouched();

    this.cdr.detectChanges()
  }
}
