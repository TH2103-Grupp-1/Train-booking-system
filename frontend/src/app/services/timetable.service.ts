import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TrainTimeTable } from '../models/timetable.model';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  BASE_URL: string;

  constructor(private http: HttpClient) {
    this.BASE_URL = environment.BASE_URL;
   }

  getTimeTables() : Observable<TrainTimeTable[]> {
    return this.http.get<TrainTimeTable[]>(`${this.BASE_URL}/timetables`);
  }
}
