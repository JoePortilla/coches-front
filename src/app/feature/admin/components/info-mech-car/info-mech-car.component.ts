import {Component} from '@angular/core';
import {ControlContainer} from "@angular/forms";

@Component({
  selector: 'app-info-mech-car',
  templateUrl: './info-mech-car.component.html',
  styleUrl: './info-mech-car.component.css'
})
export class InfoMechCarComponent {
  public infoMechForm: any;

  constructor(private controlContainer: ControlContainer) {
  }

  ngOnInit(): void {
    // The object is declared as a control
    this.infoMechForm = this.controlContainer.control;
    // The control is pointed to the parent form
    this.infoMechForm = this.infoMechForm.controls["infoMechForm"];
  }
}
