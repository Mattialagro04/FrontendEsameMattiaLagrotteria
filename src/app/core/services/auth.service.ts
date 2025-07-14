// src/app/core/services/auth.service.ts
// NESSUNA MODIFICA NECESSARIA QUI. IL TUO CODICE VA BENE.
// Ho solo rimosso i console.log per pulizia.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { ILoginUser, IRegisterUser, IUser } from '../models/user.model';
import { AuthResponse } from '../models/auth-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/utenti`;
  private readonly TOKEN_KEY = 'authToken';

  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: ILoginUser) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => localStorage.setItem(this.TOKEN_KEY, response.token)),
      switchMap(() => this.http.get<IUser>(`${this.apiUrl}/me`)),
      tap(user => this.currentUserSubject.next(user ?? null)),
      catchError(err => {
        console.error('[AuthService] login error', err);
        throw err;
      })
    );
  }

  register(user: IRegisterUser) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user).pipe(
      tap(response => localStorage.setItem(this.TOKEN_KEY, response.token)),
      switchMap(() => this.http.get<IUser>(`${this.apiUrl}/me`)),
      tap(user => this.currentUserSubject.next(user)),
      catchError(err => {
        console.error('[AuthService] register error', err);
        throw err;
      })
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
  }
  
  // Metodo pubblico che l'interceptor userà
  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  checkTokenOnLoad(): Promise<void> {
    const token = this.getToken();
    if (!token) return Promise.resolve();

    return this.http.get<IUser>(`${this.apiUrl}/me`).toPromise()
      .then(user => this.currentUserSubject.next(user ?? null))
      .catch(() => this.logout());
  }

  getCurrentUser(): IUser | null {
    return this.currentUserSubject.value;
  }
}