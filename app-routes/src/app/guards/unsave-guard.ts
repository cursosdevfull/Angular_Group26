import { CanDeactivateFn } from '@angular/router';

export interface ICanComponentDeactivate {
  unsavedChanges: () => boolean | Promise<boolean>;
}

export const unsaveGuard: CanDeactivateFn<ICanComponentDeactivate> = (
  component,
  currentRoute,
  currentState,
  nextState,
) => {
  const hasUnsavedChanges = component.unsavedChanges();

  if(hasUnsavedChanges) {
    const confirmLeave = confirm("You have unsaved changes. Do you really want to leave this page?");
    if(!confirmLeave) {
      return false;
    }
  }

  return true
};
