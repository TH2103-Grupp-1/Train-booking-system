import { Component, OnInit } from '@angular/core';
import { Station } from '../models/station.model';
import { StationService } from '../services/station.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  stations: Station[] = [];
  constructor(private stationService: StationService) { }

  ngOnInit(): void {
    this.getStations();
  }

  getStations(): void {
    this.stationService.getStations()
        .subscribe(stations => this.stations = stations);
  }
}
