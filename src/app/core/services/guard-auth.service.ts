import {Injectable} from '@angular/core';
import {TokenService} from "./token.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GuardAuthService {

  constructor(private tokenService: TokenService,
              private router: Router) {
  }

  /**
   * Guardian redirecting to the respective pages of your role if you are logged in and try to log in again.
   */
  // canActiveWithAuth
  public canActiveLogin(): boolean {
    // Validate if token exist
    if (this.tokenService.getToken()) {
      this.router.navigateByUrl("/portfolio");
      return false;
    }

    return true;
  }

  /**
   * Guardian that allows you to access a page if you are logged in.
   */
  public canActiveWithAuth(): boolean {
    // Validate if token exist
    if (!this.tokenService.getToken()) {
      alert("No permissions");
      this.router.navigateByUrl("/auth/login");
      return false;
    }

    return true;
  }
}
