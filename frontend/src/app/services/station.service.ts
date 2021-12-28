import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from '../models/station.model';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  BASE_URL = window.location.origin + '/api';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getStations(): Observable<Station[]> {

    return this.http.get<Station[]>(this.BASE_URL + '/trainstations');
  }


}
