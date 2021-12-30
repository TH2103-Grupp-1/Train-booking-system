import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  BASE_URL: string;

  constructor() {
    this.BASE_URL = environment.BASE_URL;
   }


  getTrainTimeTable(trainId: number) {

  }

}
