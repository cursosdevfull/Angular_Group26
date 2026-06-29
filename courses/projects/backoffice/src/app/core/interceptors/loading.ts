import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core/primitives/di';
import { LoadingService } from '@backoffice/shared/services/loading';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.setLoading(true);

  return next(req).pipe(
    delay(Math.ceil(Math.random() * 2000 + 1000)), // Simulate a delay between 1 and 3 seconds
    finalize(() => {
      loadingService.setLoading(false);
    }),
  );
};
