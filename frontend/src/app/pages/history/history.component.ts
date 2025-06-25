import { Component, OnInit } from '@angular/core';
import { WatchHistoryService } from '../../services/watch-history.service';
import { StrippedPage } from '../../util/paging';
import { HistoryVideo } from '../../models/video.model';
import { HistoryVideoComponent } from '../../components/history-video/history-video.component';

@Component({
  selector: 'app-history',
  imports: [HistoryVideoComponent],
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
}
