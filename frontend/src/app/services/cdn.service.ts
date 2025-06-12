import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { env } from '../../environments/env';

@Injectable({
  providedIn: 'root'
})
export class CdnService {
  private apiUrl = env.cdnUrl;
  constructor(private http: HttpClient) {}

  uploadImage(selectedFile: File | null): Observable<string> {
    if (!selectedFile) return of('');

    // return this.http.post(`${this.apiUrl}/image/cdn`, selectedFile); // TODO implement CDN

    return of('https://picsum.photos/1600/900');
  }
}
