import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ChannelSlim } from '../../models/channel.model';

@Component({
  selector: 'app-channel-choice',
  imports: [],
  templateUrl: './channel-choice.component.html',
  styleUrl: './channel-choice.component.css'
})
export class ChannelChoiceComponent {
  channels: ChannelSlim[] = [];
  private returnUrl = '/';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authService.getCurrUserChannels().subscribe((channels) => {
      if (channels.length === 0) this.navigateToCreate();
      this.channels = channels;
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.returnUrl = params.get('returnUrl') || '/';
    });
  }

  selectChannel(channel: ChannelSlim) {
    this.authService.currentChannel = channel;
    this.router.navigate([this.returnUrl]);
  }

  navigateToCreate() {
    this.router.navigate(['/channel/create'], {
      queryParams: { returnUrl: this.returnUrl }
    });
  }
}
