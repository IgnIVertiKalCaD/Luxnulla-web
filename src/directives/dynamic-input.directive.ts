import { Directive, ElementRef, HostListener, OnInit, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appDynamicInput]',
  standalone: true
})
export class DynamicInputDirective implements OnInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  private minWidth: number = 20;

  constructor() {
    this.resizeInput();
  }

  @HostListener('input') onInput(): void {
    this.resizeInput();
  }

  ngOnInit() {
    this.resizeInput();
  }

  private resizeInput(): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const length = input.value.length;
    const newWidth = Math.max(this.minWidth, length * 8);

    this.renderer.setStyle(input, 'width', `${newWidth}px`);
  }
}
