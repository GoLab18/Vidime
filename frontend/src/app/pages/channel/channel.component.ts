import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Channel } from '../../models/channel.model';
import { ChannelService } from '../../services/channel.service';
import { FormatNumberPipe } from '../../pipes/format-number.pipe';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { ActivatedRoute } from '@angular/router';
import { ChannelLink } from '../../models/channel-link.model';

@Component({
  selector: 'app-channel',
  imports: [CommonModule, FormatNumberPipe, FormatDatePipe],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.css'
})
export class ChannelComponent implements OnInit {
  @Input({required: true}) videoId!: number;

  channel!: Channel;
  links!: ChannelLink[];

  constructor(private channelService: ChannelService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.videoId = Number(params.get('i'));
      this.videoId = 101; // TODO only for testing
      this.channelService.getChannel(this.videoId).subscribe(channel => {
        this.channel = channel;
        this.channelService.getLinks(this.channel.id).subscribe(links => this.links = links);
      });
    });
  }
}
