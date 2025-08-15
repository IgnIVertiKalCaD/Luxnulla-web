import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SizeDirective} from "@/directives/size.directive";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [
    SizeDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class CardComponent {
  @Input()
  width: string;

  @Input()
  height: string;

  @Input()
  padding: string;

  @Input()
  className: string = 'solid_v1';

  protected isHover: boolean = false;

  get selectHoverStatus() {
    return this.isHover
  }

  onPointerEnter(event: MouseEvent): void {
    this.isHover = true
  }

  onPointerLeave(event: MouseEvent): void {
    this.isHover = false
  }
}
