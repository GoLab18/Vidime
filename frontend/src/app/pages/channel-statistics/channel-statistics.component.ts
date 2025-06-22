import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChannelService } from '../../services/channel.service';
import { Channel } from '../../models/channel.model';

@Component({
  selector: 'app-channel-statistics',
  imports: [],
  templateUrl: './channel-statistics.component.html',
  styleUrl: './channel-statistics.component.css'
})
export class ChannelStatisticsComponent {
  channel!: Channel;
  
  constructor(private authService: AuthService, private channelService: ChannelService) {
    this.channelService.getChannel(this.authService.currentChannelId!).subscribe(channel => {
      this.channel = channel;
    });
  }
}
