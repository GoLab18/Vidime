import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, Observable, of, throwError } from 'rxjs';
import { env } from '../../environments/env';
import { Subscription } from '../models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = env.apiUrl + '/subscriptions';
  
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Returns observable Subscription object when subscription found, otherwise on 404 returns null.
  getCurrChannelSubscriptionTo(channelId: number): Observable<Subscription | null> {
    const params = new HttpParams()
      .set('subscriberId', this.authService.currentChannelId!)
      .set('channelId', channelId);
  
    return this.http.get<Subscription>(`${this.apiUrl}/check`, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) return of(null);
        return throwError(() => error);
      })
    );
  }

  subscribeTo(channelId: number): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.apiUrl}/sub`, { subscriberId: this.authService.currentChannelId!, channelId });
  }

  unsubscribe(subscriptionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/unsub/${subscriptionId}`);
  }
}
