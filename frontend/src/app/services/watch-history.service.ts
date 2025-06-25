import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../environments/env';
import { StrippedPage } from '../util/paging';
import { HistoryVideo } from '../models/video.model';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WatchHistoryService {
  private apiUrl = `${env.apiUrl}/watch-history`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchWatchHistoryVideosBatch(before?: string, pageNumber?: number, pageSize?: number): Observable<StrippedPage<HistoryVideo>> {
    let params = new HttpParams();

    if (pageNumber) params = params.set('page', pageNumber);
    if (pageSize) params = params.set('size', pageSize);
    if (before) params = params.set('before', before);
    
    return this.http.get<StrippedPage<HistoryVideo>>(`${this.apiUrl}/batch/${this.authService.currentChannelId}`, { params });
  }
}
