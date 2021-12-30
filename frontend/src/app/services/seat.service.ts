import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Seat } from '../models/seat.model';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  BASE_URL: string;

  constructor(private http: HttpClient) {
    this.BASE_URL = environment.BASE_URL;
  }

  getSeatsForCarriage(carriageId: number): Observable<Seat[]> { // Return all seats that belong to the selected carriage
    return this.http.get<Seat[]>(`${this.BASE_URL}/carriage/${carriageId}/seats`);
  }
}
