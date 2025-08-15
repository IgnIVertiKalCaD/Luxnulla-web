import { Directive, ElementRef, Input, OnInit, Renderer2, OnDestroy, afterNextRender, inject } from '@angular/core';

@Directive({
  selector: '[lazyLoad]'
})
export class LazyLoadImageDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @Input('lazyLoad') src!: string;

  private observer!: IntersectionObserver;

  ngOnInit() {

  }

  private loadImage() {
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.src);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
