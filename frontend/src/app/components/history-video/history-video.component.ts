import { Component, Input } from '@angular/core';
import { HistoryVideo } from '../../models/video.model';
import { Router } from '@angular/router';
import { FormatNumberPipe } from '../../pipes/format-number.pipe';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { FormatDurationPipe } from '../../pipes/format-duration.pipe';
import { CommonModule } from '@angular/common';
import { FormatTimePipe } from '../../pipes/format-time.pipe';

@Component({
  selector: 'app-history-video',
  imports: [CommonModule, FormatNumberPipe, FormatDatePipe, FormatDurationPipe, FormatTimePipe],
  templateUrl: './history-video.component.html',
  styleUrl: './history-video.component.css'
})
export class HistoryVideoComponent {
  @Input({required: true}) video!: HistoryVideo;

  thumbnailLoaded = false;

  constructor(private router: Router) {}

  navigateToVideo(id: number, videoUuid: string) {
    this.router.navigate(['/watch'], { queryParams: { i: id, v: videoUuid } });
  }

  onImageLoad() {
    this.thumbnailLoaded = true;
  }
}
