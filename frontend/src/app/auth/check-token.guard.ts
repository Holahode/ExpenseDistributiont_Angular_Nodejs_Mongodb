import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataService } from './data.service';

export const checkTokenGuard: CanActivateFn = (route, state) => {
  const authService = inject(DataService);
  const router = inject(Router);

  if (authService.state().token) {
    return true;
  } else {
    router.navigate(['', 'login']);
    return false;
  }
};
