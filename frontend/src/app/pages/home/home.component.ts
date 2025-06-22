import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoSlim } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { DynamicSizeTileGridComponent } from '../../components/dynamic-size-tile-grid/dynamic-size-tile-grid.component';
import { SortOrder } from '../../util/sorting';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DynamicSizeTileGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  videos: VideoSlim[] = [];
  
  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videoService.getAllVideos('addedAt', SortOrder.DESC).subscribe(videos => this.videos = videos);
  }
}
