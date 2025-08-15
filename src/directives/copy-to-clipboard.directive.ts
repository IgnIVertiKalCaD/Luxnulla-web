import { Directive, ElementRef, HostListener, Input, OnInit, inject } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Directive({
  selector: '[appCopyToClipboard]',
  standalone: true
})
export class CopyToClipboardDirective implements OnInit {
  private clipboard = inject(Clipboard);
  private el = inject<ElementRef<HTMLElement>>(ElementRef);


  @Input({required: true})
  textToCopy: string | null;

  @HostListener('click')
  copyText() {
    if (this.textToCopy) {
      this.clipboard.copy(this.textToCopy);
    } else {
      //todo make
    }
  }

  ngOnInit() {
    this.el.nativeElement.style.cursor = 'pointer';
  }
}
