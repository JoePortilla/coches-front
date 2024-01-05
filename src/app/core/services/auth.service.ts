import {Injectable} from '@angular/core';
import {LoginRequestDto} from "../dto/login-request-dto";
import {Observable, Subscription, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {LoginResponseDto} from "../dto/login-response-dto";
import {TokenService} from "./token.service";
import {RegisterRequestDto} from "../dto/register-request-dto";
import {RegisterResponseDto} from "../dto/register-response-dto";

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

  public signIn(authDto: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${apiUrl}/auth/signin`, authDto).pipe(
      tap(response => {
        this.tokenService.saveToken(response.jwt);
      })
    );
  }

  public register(registerDto: RegisterRequestDto): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>(`${apiUrl}/auth/register`, registerDto);
  }
}
