import { CanActivateFn } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const channelGuard: CanActivateFn = (_, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currChannel$.pipe(
    take(1),
    map(channel => {
      const isAuthenticated = !!channel;
      if (isAuthenticated) return true;
      return router.createUrlTree(['/channel/choice'], {
        queryParams: { returnUrl: state.url }
      });
    })
  );
};
