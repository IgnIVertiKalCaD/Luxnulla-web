import { booleanAttribute, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {ConnectedPosition, Overlay, OverlayRef, PositionStrategy} from "@angular/cdk/overlay";
import {TemplatePortal} from "@angular/cdk/portal";

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  standalone: true,
  animations: [
    trigger('tooltipShowAnim', [
      transition(':enter', [
        style({opacity: 0, transform: "translateY(-20px)"}),
        animate('100ms', style({opacity: 1, transform: "translateY(0px)"})),
      ]),
      transition(':leave', [
        style({}),
        animate('100ms', style({opacity: 0}))
      ])
    ]),
  ],
  imports: [
  ]
})
export class TooltipComponent implements OnInit, OnDestroy {
  private overlay = inject(Overlay);
  private el = inject<ElementRef<TooltipComponent>>(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);


  @Input()
  isShow: boolean = true;

  @Input()
  className: string;

  @Input({transform: booleanAttribute})
  autoHide: boolean = false;

  @Input()
  tooltipText: string = 'Copied';

  @Input()
  timeout: number = 2;

  @Input()
  position: 'top' | 'bottom' | 'left' | 'right' = 'right';

  @ViewChild('tooltipTemplate')
  tooltipTemplate: TemplateRef<any>;

  @HostListener('click')
  onClick(): void {
    this.show()
  }

  private isTooltipOpen = false;
  private overlayRef: OverlayRef;

  ngOnInit(): void {
    if (!this.overlayRef) {
      this.overlayRef = this.createOverlay();
    }
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }

  private createOverlay(): OverlayRef {
    const positionStrategy = this.getPositionStrategy();
    return this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
  }

  private getPositionStrategy(): PositionStrategy {
    return this.overlay.position()
      .flexibleConnectedTo(this.el)
      .withPositions(this.getPositions());
  }

  private getPositions(): ConnectedPosition[] {
    return {
      top: [
        { originX: 'center' as const, originY: 'top' as const, overlayX: 'center' as const, overlayY: 'bottom' as const, offsetY: -8 }
      ],
      bottom: [
        { originX: 'center' as const, originY: 'bottom' as const, overlayX: 'center' as const, overlayY: 'top' as const, offsetY: 8 }
      ],
      left: [
        { originX: 'start' as const, originY: 'center' as const, overlayX: 'end' as const, overlayY: 'center' as const, offsetX: -8 }
      ],
      right: [
        { originX: 'end' as const, originY: 'center' as const, overlayX: 'start' as const, overlayY: 'center' as const, offsetX: 8 }
      ]
    }[this.position];
  }

  show() {
    if (this.isTooltipOpen) return

    const tooltipPortal = new TemplatePortal(this.tooltipTemplate, this.viewContainerRef);

    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }

    this.overlayRef.attach(tooltipPortal);

    this.isTooltipOpen = true;

    if(this.autoHide) this.hide()
  }

  hide() {
    setTimeout(() => {
      this.overlayRef.detach();
      this.isTooltipOpen = false;
    }, this.timeout * 1000)
  }

}

