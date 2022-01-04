import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Station } from '../models/station.model';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  BASE_URL: string;

  constructor(private http: HttpClient) {
    this.BASE_URL = environment.BASE_URL;
  }

  ngOnInit(): void {
  }

  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(this.BASE_URL + '/trainstations');
  }


}
