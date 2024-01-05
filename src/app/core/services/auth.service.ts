import {Injectable} from '@angular/core';
import {AuthLoginRequestDto} from "../dto/auth-login-request-dto";
import {Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {AuthLoginResponseDto} from "../dto/auth-login-response-dto";

const {apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})
/**
 * Endpoints related to Auth. Related with the controllers in spring
 */
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public signIn(authDto: AuthLoginRequestDto): Observable<AuthLoginResponseDto> {
    return this.http.post<AuthLoginResponseDto>(`${apiUrl}/auth/signin`, authDto);
  }
}
