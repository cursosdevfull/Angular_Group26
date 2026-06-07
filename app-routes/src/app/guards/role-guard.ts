import { CanMatchFn } from '@angular/router';

const userRole = "staff"

export const roleGuard: CanMatchFn = (route, segments) => {
  const rolesAllowed = route.data?.["rolesAllowed"] as string[] | undefined;
  return rolesAllowed?.includes(userRole) ?? false;
};
