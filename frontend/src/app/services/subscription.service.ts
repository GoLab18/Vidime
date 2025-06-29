import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, Observable, of, throwError } from 'rxjs';
import { env } from '../../environments/env';
import { Subscription } from '../models/subscription.model';
import { DailyAggregation } from '../models/daily-aggregation.model';
import { TimePeriod } from '../util/dates';

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

  getSubscriptionsByChannelPerDay(channelId: number, timePeriod: TimePeriod): Observable<DailyAggregation[]> {
    const start = new Date(), end = new Date();
    switch (timePeriod) {
      case 'last7Days':
        start.setDate(start.getDate() - 6);
        break;
      case 'last30Days':
        start.setDate(start.getDate() - 29);
        break;
      case 'last90Days':
        start.setDate(start.getDate() - 89);
        break;
    }

    const params = new HttpParams()
      .set('start', start.toISOString().split('T')[0])
      .set('end', end.toISOString().split('T')[0]);
    
    return this.http.get<DailyAggregation[]>(
      `${this.apiUrl}/count/${channelId}`,
      { params }
    );
  }
}
