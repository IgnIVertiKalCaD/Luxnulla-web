import { Directive, HostListener, Input, inject } from '@angular/core';
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[appOnlyNumberWithDots]',
  standalone: true
})
export class OnlyNumberWithDotsDirective {
  private control = inject(NgControl);

  @Input()
  maxDecimalPlaces: number = 2;

  @Input()
  maxValue: number | null = null;

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    const regex = new RegExp(`^\\d*(\\.\\d{0,${this.maxDecimalPlaces}})?$`);

    // Если значение не соответствует формату, удаляем последний введенный символ
    if (value && !regex.test(value)) {
      // Удаляем последний символ
      value = value.slice(0, -1);
    }

    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('').slice(0, this.maxDecimalPlaces);
    } else if (parts.length === 2 && parts[1].length > this.maxDecimalPlaces) {
      value = parts[0] + '.' + parts[1].slice(0, this.maxDecimalPlaces);
    }

    let entirePart = input.value.split('.')[0]

    if (this.maxValue && Number(entirePart) >= this.maxValue) {
      event.preventDefault()

      input.value = String(this.maxValue)
      this.control.control?.setValue(String(this.maxValue));

      return
    }

    // Устанавливаем значение в control
    this.control.control?.setValue(value);
    input.value = value; // Обновляем значение в input
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'];
    if (allowedKeys.indexOf(event.key) !== -1) {
      return; // разрешаем эти клавиши
    }

    // Проверяем, что вводится только цифра или точка
    if (!/[\d.]/.test(event.key)) {
      event.preventDefault(); // предотвращаем ввод недопустимых символов
    }

    // Проверяем, что точка вводится только один раз
    const input = (event.target as HTMLInputElement);

    if (event.key === '.' && input.value.includes('.')) {
      event.preventDefault();
    }

    // Поддержка выделения всего текста с помощью Ctrl + A
    if (event.ctrlKey && event.key === 'a') {
      event.preventDefault();
      const inputElement = event.target as HTMLInputElement;
      inputElement.select(); // выделяем весь текст
    }
  }
}
