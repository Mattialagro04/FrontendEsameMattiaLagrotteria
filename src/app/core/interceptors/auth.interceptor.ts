// src/app/core/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service'; // <-- IMPORTA AuthService

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  // Inietta AuthService per centralizzare la logica del token
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Chiedi il token al servizio, non leggerlo direttamente da localStorage
    const token = this.authService.getToken(); 
    const isApiUrl = req.url.startsWith(environment.apiUrl);

    if (token && isApiUrl) {
      // Clona la richiesta per aggiungere l'header
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }

    // Se non c'è token o la chiamata non è verso la nostra API, lascia passare la richiesta originale
    return next.handle(req);
  }
}