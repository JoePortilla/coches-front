import {Component} from '@angular/core';
import {CarService} from "../../../../core/services/car.service";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {

  /**
   * Lista de carros del concesionario
   */
  public listCarsPortfolio: any[];

  constructor(private carService: CarService) {
  }

  ngOnInit() {
    this.carService.getAllCars().subscribe({
      next: value => {
        this.listCarsPortfolio = value;
      }
    })
  }

}
