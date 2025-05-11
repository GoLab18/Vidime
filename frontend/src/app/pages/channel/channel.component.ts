import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Channel } from '../../models/channel.model';
import { ChannelService } from '../../services/channel.service';
import { FormatNumberPipe } from '../../pipes/format-number.pipe';

@Component({
  selector: 'app-channel',
  imports: [CommonModule, FormatNumberPipe],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.css'
})
export class ChannelComponent implements OnInit {
  channel!: Channel;

  constructor(private channelService: ChannelService) {}

  ngOnInit() {
    this.channelService.getChannel(101).subscribe(channel => this.channel = channel);
  }
}
