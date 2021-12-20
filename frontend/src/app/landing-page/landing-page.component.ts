import { Component, OnInit } from '@angular/core';
import { Station } from '../models/station.model';
import { StationService } from '../services/station.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  myControl = new FormControl();
  stations: Station[] = [];
  filteredOptions: Observable<Station[]>;

  constructor(private stationService: StationService) { }

  ngOnInit(): void {
    this.getStations();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.stations.slice())),
    );
  }

  displayFn(station: Station): string {
    return station && station.AdvertisedLocationName ? station.AdvertisedLocationName : '';
  }

  private _filter(name: string): Station[] {
    const filterValue = name.toLowerCase();

    return this.stations.filter(station => station.AdvertisedLocationName.toLowerCase().includes(filterValue));
  }

  getStations(): void {
    this.stationService.getStations()
        .subscribe(stations => this.stations = stations);
  }
}
