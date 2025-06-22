import { Component } from '@angular/core';
import { VideoSlim } from '../../models/video.model';
import { Playlist } from '../../models/playlist.model';
import { Input } from '@angular/core';
import { HomeVideoComponent } from '../home-video/home-video.component';
import { HomePlaylistComponent } from '../home-playlist/home-playlist.component';

@Component({
  selector: 'app-dynamic-size-tile-grid',
  imports: [HomeVideoComponent, HomePlaylistComponent],
  templateUrl: './dynamic-size-tile-grid.component.html',
  styleUrl: './dynamic-size-tile-grid.component.css'
})
export class DynamicSizeTileGridComponent {
  @Input() videos: VideoSlim[] = [];
  @Input() playlists: Playlist[] = [];
}
