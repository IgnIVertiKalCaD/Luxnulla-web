import {Injectable, inject, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: "root"})
export class AnchorService {
  private platformId = inject(PLATFORM_ID);
  private activeSection$ = new BehaviorSubject<string | null>(null);
  readonly active$ = this.activeSection$.asObservable();

  setActive(id: string) {
    if (isPlatformBrowser(this.platformId)) {
      if (this.activeSection$.value !== id) {
        history.replaceState(null, "", `#${id}`);
        this.activeSection$.next(id);
      }
    }
  }
}
