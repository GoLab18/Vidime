import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ChannelSlim } from '../models/channel.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';

  // Token keys for sessionStorage
  private readonly TOKEN_KEY = 'authToken';
  private readonly USER_ID_KEY = 'currUserId';
  private readonly CURRENT_CHANNEL_KEY = 'currChannel';

  // Current user ID subject
  private currUserIdSubject = new BehaviorSubject<number | null>(null);
  currUserId$ = this.currUserIdSubject.asObservable();

  // Chosen channel subject
  private currChannelSubject = new BehaviorSubject<ChannelSlim | null>(null);
  currChannel$ = this.currChannelSubject.asObservable();
  

  // Timer for auto logout
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
    const userId = sessionStorage.getItem(this.USER_ID_KEY);
    const channel = sessionStorage.getItem(this.CURRENT_CHANNEL_KEY);
  
    if (userId) {
      this.currUserIdSubject.next(Number(userId));
      this.setAutoLogout();
  
      if (channel) this.currChannelSubject.next(JSON.parse(channel));
      else this.router.navigate(['/channel/choice']);
    }
  }

  get currUserIdValue(): number | null {
    return this.currUserIdSubject.value;
  }

  get currChannelValue(): ChannelSlim | null {
    return this.currChannelSubject.value;
  }

  setCurrentChannel(channel: ChannelSlim) {
    sessionStorage.setItem(this.CURRENT_CHANNEL_KEY, JSON.stringify(channel));
    this.currChannelSubject.next(channel);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  private clearSession() {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_ID_KEY);
    sessionStorage.removeItem(this.CURRENT_CHANNEL_KEY);

    this.currUserIdSubject.next(null);
    this.currChannelSubject.next(null);
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
  }

  // Sets auto logout 1 minute before token expires
  private setAutoLogout() {
    const token = this.getToken();
    if (!token) return;

    const jwtData = token.split('.')[1];
    const decodedJwtJsonData = window.atob(jwtData);
    const decodedJwtData = JSON.parse(decodedJwtJsonData);
    const expiresIn = (decodedJwtData.exp * 1000) - Date.now();

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expiresIn - 60000);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<null>(
      `${this.apiUrl}/login`,
      { email, password },
      { withCredentials: true, observe: 'response' }
    ).pipe(
      tap((response) => this.handleAccessTokenResponse(response)),
      map(() => true),
      catchError(this.handleError)
    );
  }

  signup(email: string, password: string): Observable<boolean> {
    return this.http.post<null>(
      `${this.apiUrl}/register`,
      { email, password }
    ).pipe(
      map(() => true),
      catchError(this.handleError)
    );
  }

  // Refreshes access token with the refresh token cookie (auto included)
  refreshToken(): Observable<boolean> {
    return this.http.post<null>(
      `${this.apiUrl}/refresh`,
      {},
      { withCredentials: true, observe: 'response' }
    ).pipe(
      tap((response) => this.handleAccessTokenResponse(response)),
      map(() => true),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  handleAccessTokenResponse(response: HttpResponse<null>) {
    const authHeader = response.headers.get('Authorization');
    const accessToken = authHeader?.split(' ')[1];

    if (accessToken) this.setSession(accessToken);
  }

  private setSession(accessToken: string) {
    const jwtPayload = accessToken.split('.')[1];
    const decodedPayload = JSON.parse(window.atob(jwtPayload));
    const userId = decodedPayload.userId;
    
    sessionStorage.setItem(this.TOKEN_KEY, accessToken);
    sessionStorage.setItem('currUserId', userId.toString());
    this.currUserIdSubject.next(userId);

    this.setAutoLogout();
  }

  logout() {
    this.clearSession();
    this.router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 401:
          errorMessage = 'Invalid email or password';
          break;
        case 400:
          errorMessage = 'Bad request';
          break;
        case 404:
          errorMessage = 'The requested resource not found';
          break;
        case 500:
          errorMessage = 'Internal server error';
          break;
        default:
          errorMessage = 'Unknown server error';
          break;
      }
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Redirects to backend OAuth endpoint TODO
  socialLogin(provider: 'google' | 'facebook' | 'github'): void {
    window.location.href = `${this.apiUrl}/${provider}`;
  }

  getCurrUserChannels(): Observable<ChannelSlim[]> {
    return this.http.get<ChannelSlim[]>(`${environment.apiUrl}/channels/user/${this.currUserIdValue}`)
      .pipe(
        catchError(this.handleError)
      );
  }
}
