import { Component, ElementRef, Input, OnInit, Renderer2, ViewEncapsulation, inject } from "@angular/core";
import { SizeDirective } from "@/directives/size.directive";

@Component({
  selector: "app-icon",
  templateUrl: "./icon.component.html",
  styleUrls: ["./icon.component.scss"],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SizeDirective],
})
export class IconComponent implements OnInit {
  el = inject<ElementRef<HTMLDivElement>>(ElementRef);
  private renderer = inject(Renderer2);


  @Input()
  className: string = "solid_v1";

  @Input()
  height: string;

  @Input()
  width: string;

  @Input()
  disabled: boolean;

  @Input()
  padding: string = "4px";

  ngOnInit() {
    if (this.disabled)
      this.renderer.addClass(this.el.nativeElement, "disabled");
  }
}
