import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {CarDto} from "../dto/CarDto";

const {apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) {
  }

  public getAllCars(): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrl}/cars`);
  }

  public registerCar(newCar: CarDto): Observable<CarDto> {
    return this.http.post<CarDto>(`${apiUrl}/cars`, newCar);
  }
}
