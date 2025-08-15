import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";

@Directive({
  selector: "[appInputTextUtils]",
  standalone: true,
})
export class InputTextUtilsDirective {
  private _maxLength = 0;
  private _allowedPattern: RegExp | null = null;

  @Input() set maxLength(value: number) {
    this._maxLength = value < 0 ? 0 : value;
  }

  @Input() set allowedPattern(pattern: string) {
    try {
      this._allowedPattern = pattern ? new RegExp(pattern) : null;
    } catch (e) {
      console.error("Invalid regex pattern:", pattern);
      this._allowedPattern = null;
    }
  }

  @Output() maxLengthReached = new EventEmitter<void>();
  @Output() invalidInputAttempt = new EventEmitter<void>();

  @HostListener("keypress", ["$event"])
  onKeyPress(event: KeyboardEvent) {
    if (!this._allowedPattern) return true;
    return this._allowedPattern.test(event.key);
  }

  @HostListener("beforeinput", ["$event"])
  onBeforeInput(event: InputEvent) {
    if (
      event.inputType === "deleteContentBackward" ||
      event.inputType === "deleteContentForward"
    ) {
      return true; // Allow any deletion
    }

    const input = event.target as HTMLInputElement;
    if (!event.data) return true;

    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    const futureValue =
      input.value.slice(0, start) + event.data + input.value.slice(end);

    // Check max length
    if (this._maxLength && futureValue.length > this._maxLength) {
      event.preventDefault();
      this.maxLengthReached.emit();
      return false;
    }

    // Check pattern if defined
    if (this._allowedPattern && !this._allowedPattern.test(event.data)) {
      event.preventDefault();
      this.invalidInputAttempt.emit();
      return false;
    }

    return true;
  }
}
