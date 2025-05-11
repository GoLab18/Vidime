import { Component, HostListener, Input } from '@angular/core';
import { Video } from '../../models/video.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormatNumberPipe } from '../../pipes/format-number.pipe';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { FormatDurationPipe } from '../../pipes/format-duration.pipe';

@Component({
  selector: 'app-home-video',
  imports: [CommonModule, FormatNumberPipe, FormatDatePipe, FormatDurationPipe],
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

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        this.navigateToVideo(this.video.id, this.video.uuid);
        break;
    }
  }
}
