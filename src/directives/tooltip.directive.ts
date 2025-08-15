import { Directive, ElementRef, HostListener, Injector, Input, OnDestroy, OnInit, ViewContainerRef, inject } from "@angular/core";
import {ConnectedPosition, Overlay, OverlayRef, PositionStrategy} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";


@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnInit, OnDestroy {
  private overlay = inject(Overlay);
  private el = inject(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);
  private injector = inject(Injector);


  @HostListener('click')
  onClick(): void {
    this.show()
  }

  private isTooltipOpen = false;
  private overlayRef: OverlayRef;


  @Input()
  timeout: number = 2;

  @Input()
  tooltipText: string = 'Copied';

  @Input()
  position: 'top' | 'bottom' | 'left' | 'right' = 'right';


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
        {
          originX: 'center' as const,
          originY: 'top' as const,
          overlayX: 'center' as const,
          overlayY: 'bottom' as const,
          offsetY: -8
        }
      ],
      bottom: [
        {
          originX: 'center' as const,
          originY: 'bottom' as const,
          overlayX: 'center' as const,
          overlayY: 'top' as const,
          offsetY: 8
        }
      ],
      left: [
        {
          originX: 'start' as const,
          originY: 'center' as const,
          overlayX: 'end' as const,
          overlayY: 'center' as const,
          offsetX: -8
        }
      ],
      right: [
        {
          originX: 'end' as const,
          originY: 'center' as const,
          overlayX: 'start' as const,
          overlayY: 'center' as const,
          offsetX: 8
        }
      ]
    }[this.position];
  }


  show() {
    if (this.isTooltipOpen) return

    const injector = Injector.create({
      providers: [
        {provide: 'tooltipText', useValue: this.tooltipText }
      ],
      parent: this.injector
    });

    //todo make this

    // const tooltipPortal = new ComponentPortal(TooltipTemplateComponent, this.viewContainerRef, injector);

    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }

    // this.overlayRef.attach(tooltipPortal);

    this.isTooltipOpen = true;

    this.hide()
  }


  hide() {
    setTimeout(() => {
      this.overlayRef.detach();

      this.isTooltipOpen = false;
    }, this.timeout * 1000)
  }


  ngOnInit(): void {
    if (!this.overlayRef) {
      this.overlayRef = this.createOverlay();
    }
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }
}
