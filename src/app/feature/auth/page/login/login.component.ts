import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthLoginRequestDto} from "../../../../core/dto/auth-login-request-dto";
import {AppBaseComponent} from "../../../../core/utils/AppBaseComponent";
import {AuthService} from "../../../../core/services/auth.service";
import {lastValueFrom} from "rxjs";
import {TokenService} from "../../../../core/services/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends AppBaseComponent {
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) {
    super();
  }

  public loginForm: FormGroup = this.fb.group({
    email: ['',
      [Validators.required, Validators.email]],
    password: ['',
      [Validators.required]]
  });

  public async signIn(): Promise<void> {
    let dtoLogin: AuthLoginRequestDto;

    if (this.loginForm.valid) {
      // Temporary variables
      let email = this.loginForm.get('email').value;
      let password = this.loginForm.get('password').value;

      dtoLogin = {
        'email': email,
        'password': password
      }
      // Debug DTO
      console.log("dtoLogin->", dtoLogin);

      // Wait the observable and convert: Observable->Promise
      await lastValueFrom(this.authService.signIn(dtoLogin));
      console.log(this.tokenService.getToken());

      // Wait the login, and Redirect to the home after
      await this.router.navigateByUrl('/portfolio');


    } else {
      this.loginForm.markAllAsTouched();
      // Debug all the errors
      console.log("loginForm Errors->", this.getAllErrorsForm(this.loginForm));
    }

  }

  /**
   * Validations for the form
   * @param field field to validate
   */
  public getErrorsForm(field: string) {
    let message;

    if (this.isTouchedField(this.loginForm, field)) {
      if (this.loginForm.get(field).hasError('required')) {
        message = 'The field (' + field + ') is required';
      } else if (this.loginForm.get(field).hasError('email')) {
        message = 'Email format required';
      }
    }
    return message;
  }
}
