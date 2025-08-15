import { AfterViewInit, Directive, ElementRef, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[paginatorMod]',
  standalone: true
})
export class PaginatorModDirective implements AfterViewInit {
  private el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);


  ngAfterViewInit() {
    const sourceElement = this.el.nativeElement.querySelector('.mat-mdc-paginator-range-label');
    const targetElement = this.el.nativeElement.querySelector('.mat-mdc-paginator-page-size');

    if (sourceElement && targetElement) {
      this.renderer.appendChild(targetElement, sourceElement);
    }
  }
}
