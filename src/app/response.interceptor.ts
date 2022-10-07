import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const startTime = (new Date()).getTime();

    // just pass on the request (this is like doing nothing with the request)
    // return next.handle(request);

    // transform the request before passing it on
    return next.handle(request).pipe(map(event => {
        if (event instanceof HttpResponse) {
            const endTime = (new Date).getTime();
            const responseTime = endTime - startTime;
            console.log(`${event.url} succeed in ${responseTime} ms`)
        }
        return event;
    }));
  }
}
