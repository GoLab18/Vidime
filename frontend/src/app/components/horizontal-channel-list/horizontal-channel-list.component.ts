import { Component, Input } from '@angular/core';
import { ChannelTrending } from '../../models/channel.model';
import { Router } from '@angular/router';
import { FormatNumberPipe } from '../../pipes/format-number.pipe';

@Component({
  selector: 'app-horizontal-channel-list',
  imports: [FormatNumberPipe],
  templateUrl: './horizontal-channel-list.component.html',
  styleUrl: './horizontal-channel-list.component.css'
})
export class HorizontalChannelListComponent {
  @Input() channels: ChannelTrending[] = [];

  constructor(private router: Router) {}

  navigateToChannel(channelId: number, channelUuid: string) {
    this.router.navigate(['/channel'], { queryParams: { i: channelId, c: channelUuid } });
  }
}
