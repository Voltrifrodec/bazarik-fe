import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../common/service/auth.service';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const exclude = 'api/token';
    if(request.url.search(exclude) === -1) {
      const token = this.auth.getToken();
      if(token !== null) {
          request = request.clone({
            headers: request.headers.append('Authorization', token)
          });
      }
    }
    return next.handle(request);
  }
}

