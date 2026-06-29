import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../services/storage';
import { inject } from '@angular/core/primitives/di';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService);

  const token = storage.getItem('access_token');

  if (token) {
    const reqCloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(reqCloned);
  }

  return next(req);
};
