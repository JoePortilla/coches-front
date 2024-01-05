import {Injectable} from '@angular/core';
import {AuthLoginRequestDto} from "../dto/auth-login-request-dto";
import {Observable, Subscription, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {AuthLoginResponseDto} from "../dto/auth-login-response-dto";
import {TokenService} from "./token.service";

const {apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})
/**
 * Service responsible for communicating with endpoints related to Auth.
 * (Related with the controllers in spring)
 */
export class AuthService {

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
  }

  // public signIn(authDto: AuthLoginRequestDto): Observable<AuthLoginResponseDto> {
  //   return this.http.post<AuthLoginResponseDto>(`${apiUrl}/auth/signin`, authDto);
  // }
  public signIn(authDto: AuthLoginRequestDto): Observable<AuthLoginResponseDto> {
    return this.http.post<AuthLoginResponseDto>(`${apiUrl}/auth/signin`, authDto).pipe(
      tap(response => {
        this.tokenService.saveToken(response.jwt);
      })
    );
  }
}
