import {Component} from '@angular/core';
import {ControlContainer} from "@angular/forms";
import {BrandCarDto} from "../../../../core/dto/BrandCarDto";
import {BrandCarService} from "../../../../core/services/brand-car.service";

@Component({
  selector: 'app-info-basic-car',
  templateUrl: './info-basic-car.component.html',
  styleUrl: './info-basic-car.component.css'
})
export class InfoBasicCarComponent {
  public infoBasicForm: any;

  public listBrandCar: BrandCarDto[];

  constructor(private controlContainer: ControlContainer,
              private brandCarService: BrandCarService) {
  }

  ngOnInit(): void {
    // The object is declared as a control
    this.infoBasicForm = this.controlContainer.control;
    // The control is pointed to the parent form
    this.infoBasicForm = this.infoBasicForm.controls["infoBasicForm"];

    this.brandCarService.getAllBrandsCar().subscribe({
      next: value => this.listBrandCar = value
    })
  }
}
