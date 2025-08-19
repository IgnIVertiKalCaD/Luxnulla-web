import { provideAnimations } from "@angular/platform-browser/animations";
import { provideEventPlugins } from "@taiga-ui/event-plugins";
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
  withViewTransitions
} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from "@angular/common/http";
import { AuthInterceptor } from "./constructor/common/interceptors/auth.interceptor";
import {ApiInterceptor} from './constructor/common/interceptors/api.interceptor';
import {isBrowser} from './constructor/common/utils/ssr-helper';


export const appConfig: ApplicationConfig = {
  providers: [
        provideAnimations(),
        provideZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        get scrollPositionRestoration() {
          if (!isBrowser()) return 'enabled';

          return history.state?.disableScroll ? 'disabled' : 'enabled';
        },
      }),
      withViewTransitions()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideEventPlugins(),
        provideEventPlugins()
    ]
};
