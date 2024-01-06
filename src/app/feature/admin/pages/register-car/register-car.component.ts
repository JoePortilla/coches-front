import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppBaseComponent} from "../../../../core/utils/AppBaseComponent";
import {CustomValidators} from "../../../../core/utils/CustomValidators";
import {CarDto} from "../../../../core/dto/CarDto";
import Swal from "sweetalert2";
import {CarService} from "../../../../core/services/car.service";

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrl: './register-car.component.css'
})
export class RegisterCarComponent extends AppBaseComponent {
  constructor(private fb: FormBuilder,
              private carService: CarService) {
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

    if (!this.registerCarForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hay errores en el formulario, reviselo por favor'
      });
      console.log("Errors", this.getAllErrorsForm(this.registerCarForm));
      this.registerCarForm.markAllAsTouched();
      return;
    }

    let formData = this.registerCarForm.value;
    let formBasic = formData["infoBasicForm"];
    let formMech = formData["infoMechForm"];
    let formAesthetic = formData["infoAestheticForm"];

    let dtoRegisterCar: CarDto = {
      ...formBasic,
      ...formMech,
      ...formAesthetic
    }

    console.log("dtoRegisterCar to send->", dtoRegisterCar);

    this.carService.registerCar(dtoRegisterCar).subscribe({
      next: value => {
        Swal.fire({
          icon: 'success',
          title: 'Registro existoso',
          text: 'Se registró el carro correctamente'
        })
        console.log("Saved car->", value);
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Algo ha ocurrido',
          text: 'HUbo un problema al guardar el carro'
        });
        console.log("error saving car->", err);
      }
    });
  }
}
