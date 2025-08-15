import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {CdkScrollable} from "@angular/cdk/overlay";

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [
    CdkScrollable
  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {

  @ViewChild('textarea', { static: true })
  textarea!: ElementRef<HTMLTextAreaElement>;

  @Input()
  maxWidth: string = '100%';

  @Input()
  width: string = '100%';

  private isResizing = false;
  private initialMouseX = 0;
  private initialMouseY = 0;
  private initialWidth = 0;
  private initialHeight = 0;

  startResize(event: MouseEvent) {
    event.preventDefault();
    this.isResizing = true;

    const textarea = this.textarea.nativeElement;

    // Запоминаем начальные координаты и размеры
    this.initialMouseX = event.clientX;
    this.initialMouseY = event.clientY;
    this.initialWidth = textarea.offsetWidth;
    this.initialHeight = textarea.offsetHeight;
  }

  @HostListener('window:mousemove', ['$event'])
  onResize(event: MouseEvent) {
    if (!this.isResizing) return;

    const textarea = this.textarea.nativeElement;

    // const newWidth = this.initialWidth + (event.clientX - this.initialMouseX);
    const newHeight = this.initialHeight + (event.clientY - this.initialMouseY);

    // textarea.style.width = `${newWidth}px`;
    textarea.style.height = `${newHeight}px`;
  }

  @HostListener('window:mouseup')
  stopResize() {
    if (this.isResizing) {
      this.isResizing = false;
    }
  }
}
