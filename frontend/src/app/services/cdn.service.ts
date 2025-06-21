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

    return of(this.randomMockPhotoUrl());
  }

  uploadVideoWithThumbnail(selectedVideoFile: File, selectedImageFile: File | null): Observable<{cdnUrl: string, thumbnailUrl: string}> {

    // return this.http.post(`${this.apiUrl}/video/cdn`, { video: selectedVideoFile, thumbnail: selectedImageFile }); // TODO implement CDN

    return of({cdnUrl: this.randomMockVideoUrl(), thumbnailUrl: selectedImageFile ? this.randomMockPhotoUrl() : ''});
  }

  randomMockPhotoUrl(): string {
    return `https://picsum.photos/1600/900?random=${Math.random()}`;
  }

  randomMockVideoUrl(): string {
    const videos = [
      'https://www.w3schools.com/html/mov_bbb.mp4',
      'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      'https://www.w3schools.com/html/movie.mp4'
    ];
    return `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4?random=${Math.random()}`;
  }
}
