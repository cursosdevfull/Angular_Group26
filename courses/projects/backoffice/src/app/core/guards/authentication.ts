import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { StorageService } from '../services/storage';

export const authenticationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const storage = inject(StorageService);
  const router = inject(Router);
  const token = storage.getItem('access_token');

  if (!token) {
    router.navigate(['/']);
  }

  return !!token;
};
