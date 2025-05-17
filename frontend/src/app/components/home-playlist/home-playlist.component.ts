import { Component, HostListener, Input } from '@angular/core';
import { Playlist } from '../../models/playlist.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormatNumberPipe } from '../../pipes/format-number.pipe';
import { FormatDatePipe } from '../../pipes/format-date.pipe';

@Component({
  selector: 'app-home-playlist',
  imports: [CommonModule, FormatNumberPipe, FormatDatePipe],
  templateUrl: './home-playlist.component.html',
  styleUrl: './home-playlist.component.css'
})
export class HomePlaylistComponent {
  @Input({required: true}) playlist!: Playlist;
  @Input() minWidth: string = '300px';
  @Input() maxWidth: string = '460px';

  thumbnailLoaded = false;

  constructor(private router: Router) {}

  navigateToPlaylist(id: number, playlistUuid: string) {
    this.router.navigate(['/playlist'], { queryParams: { i: id, p: playlistUuid } });
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
        this.navigateToPlaylist(this.playlist.id, this.playlist.uuid);
        break;
    }
  }
}
