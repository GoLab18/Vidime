import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { DynamicSizeTileGridComponent } from '../../components/dynamic-size-tile-grid/dynamic-size-tile-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DynamicSizeTileGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];
  
  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videoService.getVideos().subscribe(videos => this.videos = videos);
  }
}
