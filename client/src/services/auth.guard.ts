import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if the user is logged in (you may adjust this logic based on your authentication mechanism)
    const isLoggedIn = !!localStorage.getItem('token');

    if (isLoggedIn) {
      return true; // Allow access to the route
    } else {
      // Redirect to the login page (or any other page)
      alert('Acess denied ! Please create an account or login !')
      this.router.navigate(['/']);
      return false; // Block access to the route
    }
  }
}














//this is angular 16 code:

// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
