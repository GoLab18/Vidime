import { Component, Input } from '@angular/core';
import { Video } from '../../models/video.model';
import { Router } from '@angular/router';
import { FormatNumberPipe } from '../../pipes/format-number.pipe';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { CommonModule } from '@angular/common';
import { FormatDurationPipe } from '../../pipes/format-duration.pipe';

@Component({
  selector: 'app-related-video',
  imports: [CommonModule, FormatNumberPipe, FormatDatePipe, FormatDurationPipe],
  templateUrl: './related-video.component.html',
  styleUrl: './related-video.component.css'
})
export class RelatedVideoComponent {
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
