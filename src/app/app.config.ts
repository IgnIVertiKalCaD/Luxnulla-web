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
import { ApiInterceptor } from "@/desktop/src/app/constructor/common/interceptors/api.interceptor";
import { AuthInterceptor } from "@/desktop/src/app/constructor/common/interceptors/auth.interceptor";
import { isBrowser } from '@/desktop/src/app/constructor/common/utils/ssr-helper';

export const appConfig: ApplicationConfig = {
  providers: [
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
    provideEventPlugins()
  ]
};
