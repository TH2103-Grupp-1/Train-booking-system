import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carriage } from '../models/carriage.model';
import { Train } from '../models/train.model';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  BASE_URL: string;

  constructor(private http: HttpClient) {
    this.BASE_URL = environment.BASE_URL;
   }

  getTrains() : Observable<Train[]> {
    return this.http.get<Train[]>(`${this.BASE_URL}/trains`);
  }

  getTrainById(trainId: number) : Observable<Train> {
    return this.http.get<Train>(`${this.BASE_URL}/trains/${trainId}`);
  }

  getTrainCarriages(trainId: number): Observable<Carriage[]> {
    return this.http.get<Carriage[]>(`${this.BASE_URL}/carriages/${trainId}`);
  }

  getSeatsForCarriage(carriageId: number) : Observable<Carriage[]> {
    return this.http.get<Carriage[]>(`${this.BASE_URL}/seats/${carriageId}`);
  }
}
