import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BrandCarDto} from "../dto/BrandCarDto";

const {apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})
export class BrandCarService {
  constructor(private http: HttpClient) {
  }

  public getAllBrandsCar(): Observable<BrandCarDto[]> {
    return this.http.get<BrandCarDto[]>(`${apiUrl}/brands`);
  }
}
