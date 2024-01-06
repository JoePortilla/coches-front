import {Injectable} from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {TokenService} from "../services/token.service";
import Swal from "sweetalert2";

/**
 * Intercepts HTTP requests and adds headers to the request or some logic (validations).
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {
  }

  intercept(request: HttpRequest<unknown>,
            next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers;

    // Get the request token
    let token = this.tokenService.getToken();

    // If the token does not exist, the original request is passed on.
    if (!token) {
      return next.handle(request);
    }

    // If the token exists, the header object is created by concatenating Bearer + Token
    headers = {
      'Authorization': 'Bearer ' + token,
    }

    // Clone the request to add the Authorization header
    let authRequest = request.clone({
      setHeaders: {
        ...headers
      },
      // setParams:{{}}
    });

    // Return the new request
    console.log("AuthInterceptor: request->", authRequest)
    return next.handle(authRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'registerForm Errors'
          })
        }
        return throwError(() => err);
      })
    );


  }
}
