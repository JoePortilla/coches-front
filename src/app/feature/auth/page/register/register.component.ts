import {Component} from '@angular/core';
import {AppBaseComponent} from "../../../../core/utils/AppBaseComponent";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";
import {TokenService} from "../../../../core/services/token.service";
import {Router} from "@angular/router";
import {CustomValidators} from "../../../../core/utils/CustomValidators";
import {ErrorsForm} from "../../../../core/enums/ErrorsForm";
import {RegisterRequestDto} from "../../../../core/dto/register-request-dto";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends AppBaseComponent {
  public passwordGenerated: string;
  public registered: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) {
    super();
  }

  public registerForm: FormGroup = this.fb.group({
    cardId: ['',
      [Validators.required]],
    fullName: ['',
      [Validators.required]],
    // email: ['',
    //   [Validators.required, CustomValidators.EmailValidator]],
    email: ['',
      [Validators.required, Validators.pattern("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                                               + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")]],
    cellphone: ['',
      [Validators.required, Validators.pattern("^[0-9]*$")]]
  });


  public async register(): Promise<void> {

    let dtoRegister: RegisterRequestDto = this.registerForm.value;

    if (this.registerForm.valid) {

      await lastValueFrom(this.authService.register(dtoRegister)).then(resp => {
        this.passwordGenerated = resp.password;
      })

      this.registered = true;

    } else {
      alert("registerForm Errors")
      console.log("registerForm Errors->", this.getAllErrorsForm(this.registerForm));
    }

  }

  /**
   * Validations for the form
   * @param field field to validate
   */
  public getErrorsForm(field: string) {
    let message;

    const required: Array<String> = ["cardId", "fullName", "email", "cellphone"];
    const formatEmail: Array<String> = ["email"]
    const onlyNumber: Array<String> = ["cellphone"]

    if (this.isTouchedField(this.registerForm, field)) {
      if (required.includes(field) && this.registerForm.get(field).hasError('required')) {
        message = ErrorsForm.REQUIRED;
      } else if (formatEmail.includes(field) && this.registerForm.get(field).hasError('pattern')) {
        message = ErrorsForm.EMAIL_FORMAT;
      } else if (onlyNumber.includes(field) && this.registerForm.get(field).hasError('pattern')) {
        message = ErrorsForm.ONLY_NUMBER;
      }
    }
    return message;
  }
}
