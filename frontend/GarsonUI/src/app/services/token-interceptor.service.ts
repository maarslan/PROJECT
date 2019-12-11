import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // return next.handle(req);
    const headersConfig = {
      'Content-type': 'application/json',
      Accept: 'application/json'
    };
    const token = this.tokenService.GetToken();
    if (token) {

      // tslint:disable-next-line: no-string-literal
      headersConfig['Authorization'] = token;
    }
    // tslint:disable-next-line: variable-name
    const _req = req.clone({ setHeaders: headersConfig });
    return next.handle(_req);
  }
}
