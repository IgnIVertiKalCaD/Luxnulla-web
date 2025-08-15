import {AnchorService} from "@/services/anchor.service";
import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, inject } from "@angular/core";
import {WindowService} from "@/services/window.service";

@Directive({
  selector: "[appTrackSection]",
})
export class TrackSectionDirective implements AfterViewInit, OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private anchorService = inject(AnchorService);
  private readonly windowService = inject(WindowService);

  @Input("appTrackSection") sectionId!: string;
  private observer!: IntersectionObserver;

  ngAfterViewInit() {
    if (!this.windowService.isClient()) return

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            this.anchorService.setActive(this.sectionId);
            break;
          }
        }
      },
      {
        rootMargin: "-50% 0px -50% 0px", // центр экрана
      },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.windowService.isClient()) {
      this.observer.disconnect();
    }
  }
}
