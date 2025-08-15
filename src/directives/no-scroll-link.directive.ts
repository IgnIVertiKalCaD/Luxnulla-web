// no-scroll-link.directive.ts
import { Directive, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Directive({
  selector: 'a[routerLink][noScroll]',
  standalone: true,
})
export class NoScrollLinkDirective {
  constructor() {
    const link = inject(RouterLink);

    link.state = { ...link.state, disableScroll: true };
  }
}
