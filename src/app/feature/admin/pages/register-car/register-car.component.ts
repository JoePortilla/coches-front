import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppBaseComponent} from "../../../../core/utils/AppBaseComponent";
import {CustomValidators} from "../../../../core/utils/CustomValidators";

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrl: './register-car.component.css'
})
export class RegisterCarComponent extends AppBaseComponent {
  constructor(private fb: FormBuilder) {
    super();
  }

  // Formularios anidados. CarDto en varios forms. Sesión 22 25:00
  public registerCarForm: FormGroup = this.fb.group({
    infoBasicForm: this.fb.group({
      brandCarId: ['', Validators.required],
      reference: ['', Validators.required],
      price: ['', Validators.required],
      modelYear: ['', [Validators.required, CustomValidators.numberDateFuture]],
      category: ['', Validators.required],
    }),
    infoMechForm: this.fb.group({
      horsepower: ['', Validators.required],
      engineDisplacement: ['', Validators.required],
      transmission: ['', Validators.required],
      fuelType: ['', Validators.required],
      traction: ['', Validators.required],
      steering: ['', Validators.required]
    }),
    infoAestheticForm: this.fb.group({
      color: ['', Validators.required],
      numberDoor: ['', Validators.required],
      numberSeats: ['', Validators.required],
      imagePath: ['', Validators.required],
    })
  });

  public async registerCar(): Promise<void> {

  }
}
