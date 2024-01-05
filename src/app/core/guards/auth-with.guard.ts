import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {TokenService} from "../services/token.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

/**
 * Guard when the client is authenticated
 */
export class AuthWithGuard implements CanActivate {
  constructor(private tokenService: TokenService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Validate if token exist
    if (this.tokenService.getToken()) {
      this.router.navigateByUrl("/portfolio");
      return true;
    }
    return false;
  }
}
