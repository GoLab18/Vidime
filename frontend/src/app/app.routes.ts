import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TrendingComponent } from './pages/trending/trending.component';
import { WatchComponent } from './pages/watch/watch.component';
import { ChannelComponent } from './pages/channel/channel.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ChannelStatisticsComponent } from './pages/channel-statistics/channel-statistics.component';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public.guard';
import { ChannelChoiceComponent } from './pages/channel-choice/channel-choice.component';
import { channelGuard } from './guards/channel.guard';
import { ChannelCreateComponent } from './pages/channel-create/channel-create.component';
import { PlaylistCreateComponent } from './pages/playlist-create/playlist-create.component';
import { VideoAddComponent } from './pages/video-add/video-add.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [publicGuard]
  },
  {
    path: 'watch',
    component: WatchComponent
  },
  {
    path: 'channel',
    children: [
      {
        path: '',
        component: ChannelComponent
      },
      {
        path: 'choice',
        component: ChannelChoiceComponent,
        canActivate: [authGuard]
      },
      {
        path: 'create',
        component: ChannelCreateComponent,
        canActivate: [authGuard]
      },
      {
        path: 'statistics',
        component: ChannelStatisticsComponent,
        canActivate: [authGuard, channelGuard]
      }
    ]
  },
  {
    path: 'video',
    children: [
      {
        path: 'add',
        component: VideoAddComponent,
        canActivate: [authGuard, channelGuard]
      }
    ]
  },
  {
    path: 'playlist',
    children: [
      {
        path: 'create',
        component: PlaylistCreateComponent,
        canActivate: [authGuard, channelGuard]
      }
    ]
  },
  {
    path: 'trending',
    component: TrendingComponent
  },
  {
    path: 'subscriptions',
    component: HomeComponent,
    canActivate: [authGuard, channelGuard]
  },
  {
    path: 'library',
    component: HomeComponent,
    canActivate: [authGuard, channelGuard]
  },
  {
    path: 'history',
    component: HomeComponent,
    canActivate: [authGuard, channelGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
