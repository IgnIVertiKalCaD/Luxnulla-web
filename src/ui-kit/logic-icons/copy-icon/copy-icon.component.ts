import {Component, HostListener, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {SizeDirective} from "@/directives/size.directive";

@Component({
  selector: 'app-copy-icon',
  standalone: true,
  imports: [
    SizeDirective
  ],
  templateUrl: './copy-icon.component.html',
  styleUrl: './copy-icon.component.scss',
  animations: [
    trigger('fade', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible <=> hidden', [animate('0.3s ease')]),
    ])
  ]
})
export class CopyIconComponent {
  @Input() className: string = 'transparent_v1'

  @Input() width: string;
  @Input() height: string;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHover = true
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHover = false
  }

  protected isHover: boolean = false;

  set onHoverIcon(state: boolean) {
    this.isHover = state
  }
}
