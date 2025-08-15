import { Component, ElementRef, EventEmitter, Input, Output, inject } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-input-select-option',
  templateUrl: './input-select-option.component.html',
  styleUrls: ['./input-select-option.component.scss'],
  imports: [
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class InputSelectOptionComponent {
  elementRef = inject(ElementRef);


  @Input()
  value: any;

  @Input()
  viewValue: string;

  @Output()
  onSelect = new EventEmitter<void>();

  selected: boolean = false;

  select() {
    this.onSelect.emit();
  }

  getLabel(): string {
    return this.elementRef.nativeElement.textContent.trim();
  }
}
