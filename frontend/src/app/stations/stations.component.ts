import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from '../models/station.model';
import { StationService } from '../services/station.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  constructor(public stationService: StationService) {
  }

  stations: Station[] = [];

  ngOnInit(): void {
    this.stationService.getStations().subscribe(s => {
      this.stations = s
    });
  }

  // getStations(): void {
  //   this.stations = this.stationService.getStations();
  // }
}
