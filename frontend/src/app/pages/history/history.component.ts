import { Component, OnInit } from '@angular/core';
import { WatchHistoryService } from '../../services/watch-history.service';
import { StrippedPage } from '../../util/paging';
import { HistoryVideo } from '../../models/video.model';
import { HistoryVideoComponent } from '../../components/history-video/history-video.component';
import { FormatWatchHistoryDatePipe } from '../../pipes/format-watch-history-date.pipe';

@Component({
  selector: 'app-history',
  imports: [HistoryVideoComponent, FormatWatchHistoryDatePipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  paginatedVideos!: StrippedPage<HistoryVideo>;
  
  constructor(private watchHistoryService: WatchHistoryService) {}

  ngOnInit() {
    this.fetchVideos();
  }

  fetchVideos(pageNumber?: number, before?: string, pageSize?: number) {
    this.watchHistoryService.fetchWatchHistoryVideosBatch(before, pageNumber, pageSize).subscribe((data) => {
      this.paginatedVideos = data;
    });
  }

  trackByVideoKey(_: number, videoId: number, lastWatchedAt: string): string {
    return `${videoId}-${lastWatchedAt}`;
  }

  shouldShowDateHeader(videos: HistoryVideo[], index: number): boolean {
    if (index === 0) return true;

    const current = new Date(videos[index].lastWatchedAt);
    const prev = new Date(videos[index - 1].lastWatchedAt);
  
    return !this.isSameDay(current, prev);
  }
  
  isSameDay(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }
}
