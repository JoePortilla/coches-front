import {Injectable} from '@angular/core';
import {TokenService} from "./token.service";
import {Router} from "@angular/router";
import {Roles} from "../enums/Roles";

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
  public canActiveLogin(): boolean {
    if (this.tokenService.getToken()) {
      console.log("canActiveLogin()->", false);
      this.router.navigateByUrl("/portfolio");
      return false;
    }
    console.log("canActiveLogin()->", true);
    return true;
  }

  /**
   * Guardian that allows you to access a page if you are logged in.
   */
  public canActiveSecured(): boolean {
    if (!this.tokenService.getToken()) {
      console.log("canActiveSecured()->", false);
      alert("Please, login");
      this.router.navigateByUrl("/auth/login");
      return false;
    }
    console.log("canActiveSecured()->", true);
    return true;
  }

  public canActiveWithRolAdmin(): boolean {
    if (this.canActiveSecured()) {
      if (this.tokenService.getInfoToken().rol != Roles.ADMIN) {
        console.log("canActiveWithRolAdmin()->", false);
        alert("Must be admin");
        this.router.navigateByUrl("/portfolio");
        return false;
      }
    }
    console.log("canActiveWithRolAdmin()->", true);
    return true;
  }
}
