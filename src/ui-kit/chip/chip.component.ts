import {Component, ContentChild, ElementRef, Input, ViewEncapsulation} from "@angular/core";
import {Icon_leftDirective} from "@/directives/layout/icon_left.directive";
import {SizeDirective} from "@/directives/size.directive";

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    SizeDirective
  ],
  standalone: true,
})
export class ChipComponent {

  constructor() {
  }

  @ContentChild(Icon_leftDirective)
  icon_left: ElementRef

  @Input()
  className: string = '';

  @Input()
  classNames: string[] = [];

  @Input()
  padding: string | null = null;

  @Input()
  width: string;

  @Input()
  height: string;
}
