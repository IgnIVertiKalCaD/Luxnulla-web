import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appInputOnlyNumberUtils]',
  standalone: true
})
export class InputOnlyNumberUtilsDirective {
  @Input() maxLength: number = 0;
  @Input() maxValue: number = Infinity;
  @Input() minValue: number = -Infinity;

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'
    ];

    if (allowedKeys.includes(event.key) || event.ctrlKey || event.metaKey) {
      return; // Разрешено
    }

    if (!/^\d$/.test(event.key)) {
      event.preventDefault(); // Блокируем всё кроме цифр
    }
  }

  @HostListener('beforeinput', ['$event'])
  onBeforeInput(event: InputEvent): void {
    if (!event.data || this.isDeleteEvent(event.inputType)) return;

    const input = event.target as HTMLInputElement;
    const newValue = this.getFutureValue(input, event.data);

    const digitsOnly = newValue.replace(/\D/g, '');
    const numericValue = parseInt(digitsOnly, 10) || 0;

    if (this.maxLength > 0 && digitsOnly.length > this.maxLength) {
      event.preventDefault();
      return;
    }

    if (numericValue > this.maxValue) {
      event.preventDefault();
      return;
    }

    if (numericValue < this.minValue) {
      event.preventDefault();
      return;
    }
  }

  private isDeleteEvent(inputType: string): boolean {
    return inputType === 'deleteContentBackward' || inputType === 'deleteContentForward';
  }

  private getFutureValue(input: HTMLInputElement, inserted: string): string {
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    return input.value.slice(0, start) + inserted + input.value.slice(end);
  }
}
