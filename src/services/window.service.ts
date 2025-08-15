import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this._window = window;
    } else {
      this._window = null;
    }
  }

  private readonly _window: Window | null;

  get window() {
    return this._window;
  }

  isClient(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
