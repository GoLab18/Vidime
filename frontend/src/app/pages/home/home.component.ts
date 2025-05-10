import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { HomeVideoComponent } from '../../components/home-video/home-video.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HomeVideoComponent],
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
