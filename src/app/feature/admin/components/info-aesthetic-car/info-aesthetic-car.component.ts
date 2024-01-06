import {Component} from '@angular/core';
import {ControlContainer} from "@angular/forms";

@Component({
  selector: 'app-info-aesthetic-car',
  templateUrl: './info-aesthetic-car.component.html',
  styleUrl: './info-aesthetic-car.component.css'
})
export class InfoAestheticCarComponent {
  public infoAestheticForm: any;

  constructor(private controlContainer: ControlContainer) {
  }

  ngOnInit(): void {
    // The object is declared as a control
    this.infoAestheticForm = this.controlContainer.control;
    // The control is pointed to the parent form
    this.infoAestheticForm = this.infoAestheticForm.controls["infoAestheticForm"];
  }
}
