import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { appHttpInterceptor, mockAPIInterceptor } from './shared/services/app-http-interceptor';
import { AuthService } from './shared/services/auth.service';

function initializeApp(authService: AuthService, router: Router) {
  return () => {
    if(authService.isAuthenticated()) {
      router.navigate(['/dashboard']);
    } else {
      router.navigate(['/login']);
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService, Router],
      multi: true
    },
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([mockAPIInterceptor, appHttpInterceptor]) // TODO: Remove mockAPIInterceptor in production
    )
  ],
};
