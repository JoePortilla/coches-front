import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {TokenService} from "../services/token.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

/**
 * Guard when the client is not authenticated
 */
export class AuthWithoutGuard implements CanActivate {
  constructor(private tokenService: TokenService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Validate if token exist
    if (!this.tokenService.getToken()) {
      alert("Sin permisos");
      this.router.navigateByUrl("/auth/login")
      return false;
    }
    return true;
  }
}
