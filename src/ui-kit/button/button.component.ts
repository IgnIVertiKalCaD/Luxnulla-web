import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {SizeDirective} from "@/directives/size.directive";
import {Icon_leftDirective} from "@/directives/layout/icon_left.directive";
import {Icon_rightDirective} from "@/directives/layout/icon_right.directive";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    SizeDirective
  ]
})
export class ButtonComponent {

  @ContentChild(Icon_leftDirective)
  icon_left: TemplateRef<any>;

  @ContentChild(Icon_rightDirective)
  icon_right: TemplateRef<any>;

  @Input()
  disabled: boolean = false;

  @Input()
  type: typeof HTMLButtonElement.prototype.type = 'button';

  @Input()
  className: string;

  @Input()
  width: string;

  @Input()
  height: string;

  @Input()
  styles: {
    padding: string | null
  } = {
    padding: null
  };

  @Input()
  isActive: boolean = false

  @Output()
  clickEvent = new EventEmitter()
}

