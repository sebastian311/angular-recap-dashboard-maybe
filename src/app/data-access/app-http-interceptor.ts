import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

export function appHttpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authToken = inject(AuthService).getAuthToken();
  
  const reqWithHeader = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${authToken}`)
  })
  
  return next(reqWithHeader);
}

/**
 * Mock API Interceptor
 * Comment out Mocked API Routes as they get implemented in the backend.
 * This is just a placeholder to show how to mock API calls in Angular.
 * Delete this when all API calls are implemented in the backend.
 */
export function mockAPIInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  // SIGN IN API MOCK
  if (req.url.endsWith('/api/sign-in') && req.method === 'POST') {
    return new Observable<HttpEvent<unknown>>(subscriber => {
      subscriber.next(new HttpResponse({
        body: { token: 'mock-token' }
      }));
      subscriber.complete();
    });
  }
  return next(req);
}