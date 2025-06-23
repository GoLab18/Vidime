import { Component, Input } from '@angular/core';
import { ChannelTrending } from '../../models/channel.model';

@Component({
  selector: 'app-horizontal-channel-list',
  imports: [],
  templateUrl: './horizontal-channel-list.component.html',
  styleUrl: './horizontal-channel-list.component.css'
})
export class HorizontalChannelListComponent {
  @Input() channels: ChannelTrending[] = [];
}
