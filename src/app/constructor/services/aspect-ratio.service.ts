import { Injectable, isDevMode, inject } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Injectable({
  providedIn: "root",
})
export class AspectRatioService {
  private responsive = inject(BreakpointObserver);

  private isMobileAspectRatio = false;
  private isMobileFingerprint = false;

  constructor() {
    document.body.style.setProperty("--chrome-scroll-offset", `0px`);

    this.init().then(r => r);
  }

  async init() {
    this.isMobileFingerprint = await this.detectMobileFingerPrintInHeader();

    this.responsive
      .observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .subscribe((result) => {
        this.isMobileAspectRatio = result.matches;
        this.updateLayout();
      });

    this.updateLayout();
  }

  private updateLayout(): void {
    if (this.isMobileFingerprint || this.isMobileAspectRatio) {
      this.setupMobile();
    } else {
      this.setupDesktop();
    }
  }

  private async detectMobileFingerPrintInHeader(): Promise<boolean> {
    if (isDevMode()) return false;

    const response = await fetch(document.location.toString(), {
      method: "GET",
    });
    return response.headers.has("x-mobile-mode");
  }

  private setupDesktop(): void {
    document.body.style.setProperty("--chrome-scroll-offset", `0px`);
  }

  private setupMobile(): void {
    document.body.style.setProperty("--chrome-scroll-offset", `0px`);
  }

  // Дополнительно геттеры:
  public get isMobile(): boolean {
    return this.isMobileFingerprint || this.isMobileAspectRatio;
  }
}
