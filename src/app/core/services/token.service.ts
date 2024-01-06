import {Injectable} from '@angular/core';
import {getCookie, setCookie} from "typescript-cookie";
import {UserJwtDto} from "../dto/UserJwtDto";
import {jwtDecode} from "jwt-decode";

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

  /**
   * You should install jwtDecode
   */
  public getInfoToken(): UserJwtDto {
    let infoToken = jwtDecode(getCookie("token"));
    // console.log("getInfoToken->", infoToken)
    return <UserJwtDto>infoToken;
  }
}
