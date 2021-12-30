import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  BASE_URL: string;

  constructor() {
    this.BASE_URL = environment.BASE_URL;
  }

  getSeatsForCarriage(carriageId: number) {

  }
}
