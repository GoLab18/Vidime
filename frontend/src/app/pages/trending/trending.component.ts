import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { HomeVideoComponent } from '../../components/home-video/home-video.component';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [CommonModule, HomeVideoComponent],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent implements OnInit {
  videos: Video[] = [];

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    this.videoService.getTrendingVideos().subscribe(data => {
      this.videos = data;
    });
  }
}
