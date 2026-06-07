import { CanActivateChildFn } from '@angular/router';

export const viewGuard: CanActivateChildFn = (childRoute, state) => {
  return false;
};
