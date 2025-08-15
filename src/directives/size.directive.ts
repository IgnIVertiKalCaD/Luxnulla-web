import { Directive, ElementRef, Input, OnInit, inject } from "@angular/core";

@Directive({
  selector: "[appSize]",
  standalone: true,
})
export class SizeDirective implements OnInit {
  private readonly el = inject(ElementRef);


  @Input("width")
  width: string;

  @Input("height")
  height: string;

  ngOnInit() {
    this.el.nativeElement.style.width = this.width;
    this.el.nativeElement.style.height = this.height;
  }
}
