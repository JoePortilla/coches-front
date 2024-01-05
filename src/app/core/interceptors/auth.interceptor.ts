import {Injectable} from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {TokenService} from "../services/token.service";
import Swal from "sweetalert2";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {
  }

  intercept(request: HttpRequest<unknown>,
            next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("entre al interceptor");

    let headers;

    // Obtener el token de la petición
    let token = this.tokenService.getToken();
    console.log("token interceptor", token, this.tokenService.getToken());

    if (!token) {
      // Si el token no existe se pasa la request original
      console.log("request original->", request)
      return next.handle(request);
    }

    // Creo el objeto de header
    headers = {
      'Authorization': 'Bearer ' + token,
      // 'Access-Control-Allow-Origin': '*'
    }
    console.log(headers)

    // Clonar la petición para cambiar su header
    let authRequest = request.clone({
      setHeaders: {
        ...headers
      },
      // setParams:{{}}
    });

    console.log("AuthRequest->", authRequest)
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
