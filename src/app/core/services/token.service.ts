import {Injectable} from '@angular/core';
import {getCookie, setCookie} from "typescript-cookie";

@Injectable({
  providedIn: 'root'
})
/**
 * save, delete and modify token
 */
export class TokenService {

  constructor() {
  }

  public getToken(): string {
    return getCookie("token");
  }

  /**
   * Save the token in cookie
   */
  public saveToken(token: string): void {
    setCookie("token", token,
      {expires: 1, path: "/"});
  }

  public deleteToken(): void {

  }
}
