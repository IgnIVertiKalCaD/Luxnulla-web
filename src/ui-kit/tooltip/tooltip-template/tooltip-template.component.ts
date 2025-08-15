import { Component, HostBinding, Input, inject } from '@angular/core';
import {NgIf} from "@angular/common";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-tooltip-template',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './tooltip-template.component.html',
  styleUrl: './tooltip-template.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0, transform: "translateY(-20px)"}),
        animate('100ms', style({opacity: 1, transform: "translateY(0px)"})),
      ]),
      transition(':leave', [
        animate('100ms', style({opacity: 0}))
      ])
    ])
  ]

})
export class TooltipTemplateComponent {
  tooltipText = inject<string>('tooltipText' as any);


  @HostBinding('@fadeInOut')
  fadeInOut = true;

}
