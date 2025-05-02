import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WatchComponent } from './pages/watch/watch.component';

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
    path: 'trending',
    component: HomeComponent
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
