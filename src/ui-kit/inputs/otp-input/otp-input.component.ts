import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {NgForOf} from "@angular/common";
import {SizeDirective} from "@/directives/size.directive";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss'],
  imports: [
    NgForOf,
    SizeDirective,
    FormsModule,
    ReactiveFormsModule
  ],
  standalone: true
})
export class OtpInputComponent implements OnInit {
  @ViewChildren('otpInput')
  otpInputs!: QueryList<ElementRef>;

  @Input()
  width: string = '57px';

  @Input()
  height: string = '48px';

  @Input()
  otpForm: FormGroup;

  otpFormArray = new FormArray([] as AbstractControl[]);

  @Output()
  finishEvent = new EventEmitter<any>();

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!/^\d$/.test(value)) {
      input.value = '';
      this.otpForm.get(index.toString())?.setValue('');

      return;
    }

    if (value.length === 1 && index < this.otpFormArray.length - 1) {
      this.focusNextInput(index);
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      if(input.value) {
        event.preventDefault()

        input.value = '';
        this.otpForm.get(index.toString())?.setValue('');

        return
      }

      this.otpForm.get(index.toString())?.setValue('');
      input.value = '';

      if (index > 0) {
        this.focusPrevInput(index);
      }
    }
  }

  focusNextInput(index: number): void {
    const nextInput = this.otpInputs.get(index + 1)?.nativeElement as HTMLInputElement;
    nextInput?.focus();
  }

  focusPrevInput(index: number): void {
    const prevInput = this.otpInputs.get(index - 1)?.nativeElement as HTMLInputElement;
    prevInput?.focus();
  }

  ngOnInit(): void {
    // objectKeys(this.otpForm.controls)
    //   .forEach((control) => {
    //     this.otpFormArray.push(
    //       new FormControl(control, Validators.required)
    //     )
    //   })

    this.otpForm.valueChanges.subscribe(() => {
      if (this.otpForm.valid) this.finishEvent.emit(this.otpForm.value);
    })
  }
}
