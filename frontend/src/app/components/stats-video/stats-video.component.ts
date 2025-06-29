import { Component, Input } from '@angular/core';
import { StatsVideo } from '../../models/video.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormatDurationPipe } from '../../pipes/format-duration.pipe';
import { FormatNumberPipe } from '../../pipes/format-number.pipe';
import { FormatDatePipe } from '../../pipes/format-date.pipe';

@Component({
  selector: 'app-stats-video',
  imports: [CommonModule, FormatNumberPipe, FormatDatePipe, FormatDurationPipe],
  templateUrl: './stats-video.component.html',
  styleUrl: './stats-video.component.css'
})
export class StatsVideoComponent {
  @Input({required: true}) video!: StatsVideo;
  
  isExpanded = false;
  thumbnailLoaded = false;

  constructor(private router: Router) {}

  navigateToVideo(id: number, videoUuid: string) {
    this.router.navigate(['/watch'], { queryParams: { i: id, v: videoUuid } });
  }

  onImageLoad() {
    this.thumbnailLoaded = true;
  }
}
