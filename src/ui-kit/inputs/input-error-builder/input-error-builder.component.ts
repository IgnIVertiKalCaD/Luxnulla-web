import { Component, forwardRef, Input, inject } from "@angular/core";
import { NgForOf, NgIf } from "@angular/common";
import {
  AbstractControl,
  ControlContainer,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from "@angular/forms";
import { style, transition, trigger, animate } from "@angular/animations";

@Component({
  selector: "app-input-error-builder",
  templateUrl: "./input-error-builder.component.html",
  styleUrls: ["./input-error-builder.component.scss"],
  imports: [NgIf, NgForOf],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputErrorBuilderComponent),
      multi: true,
    },
  ],
  animations: [
    trigger("errorAnimation", [
      transition(":enter", [
        style({ height: 0, opacity: 0 }),
        animate("250ms ease", style({ height: "*", opacity: 1 })),
      ]),
      transition(":leave", [
        animate("200ms ease", style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
  standalone: true,
})
export class InputErrorBuilderComponent {
  private controlContainer = inject(ControlContainer);

  @Input() formControlName?: string | null = null;
  @Input() formGroupName?: string | null = null;

  control!: AbstractControl | null;
  formGroup!: AbstractControl | null;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {}
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.formGroup = this.controlContainer.control;

    if (this.formControlName && this.formGroup?.get(this.formControlName)) {
      this.control = this.formGroup?.get(this.formControlName);
    }
  }

  get errorMessagesFormControl(): string[] {
    if (!this.control || !this.control.errors) return [];

    return this.getErrorsMessages(this.control.errors);
  }

  get errorMessagesFormGroup(): string[] {
    if (!this.formGroup || !this.formGroup.errors) return [];

    return this.getErrorsMessages(this.formGroup.errors);
  }

  private getErrorsMessages(errors: ValidationErrors): string[] {
    const messages: string[] = [];

    if (errors["required"])
      messages.push("Это поле обязательно для заполнения");
    if (errors["minlength"])
      messages.push(`Минимальная длина: ${errors["minlength"].requiredLength}`);
    if (errors["maxlength"])
      messages.push(
        `Максимальная длина: ${errors["maxlength"].requiredLength}`,
      );
    if (errors["email"]) messages.push("Неверный формат электронной почты");
    if (errors["pattern"])
      messages.push("Значение не соответствует требуемому формату");
    if (errors["compareError"])
      messages.push("Левое значение не должно быть больше правого значения");
    if (errors["min"])
      messages.push(`Значение не должно быть меньше ${errors["min"].min}`);
    if (errors["max"])
      messages.push(`Значение не должно быть больше ${errors["max"].max}`);

    return messages;
  }
}
