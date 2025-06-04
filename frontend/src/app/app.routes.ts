import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TrendingComponent } from './pages/trending/trending.component';
import { WatchComponent } from './pages/watch/watch.component';
import { ChannelComponent } from './pages/channel/channel.component';
import { AccountComponent } from './pages/account/account.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'watch',
    component: WatchComponent
  },
  {
    path: 'channel',
    component: ChannelComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'trending',
    component: TrendingComponent
  },
  {
    path: 'subscriptions',
    component: HomeComponent
  },
  {
    path: 'library',
    component: HomeComponent
  },
  {
    path: 'history',
    component: HomeComponent
  }
];
