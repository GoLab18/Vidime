import { Component, Input } from '@angular/core';
import { Video } from '../../models/video.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormatViewsPipe } from '../../pipes/format-views.pipe';
import { FormatDatePipe } from '../../pipes/format-date.pipe';

@Component({
  selector: 'app-home-video',
  imports: [CommonModule, FormatViewsPipe, FormatDatePipe],
  templateUrl: './home-video.component.html',
  styleUrl: './home-video.component.css'
})
export class HomeVideoComponent {
  @Input({required: true}) video!: Video;
  thumbnailLoaded = false;

  constructor(private router: Router) {}

  navigateToVideo(id: number, videoUuid: string) {
    this.router.navigate(['/watch'], { queryParams: { i: id, v: videoUuid } });
  }

  onImageLoad() {
    this.thumbnailLoaded = true;
  }
}
