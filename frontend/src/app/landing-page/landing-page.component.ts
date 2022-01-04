import { Component, OnInit } from '@angular/core';
import { Station } from '../models/station.model';
import { StationService } from '../services/station.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Booking } from '../models/booking.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BookingBuilderService } from '../services/booking-builder.service';
import { Route, Router } from '@angular/router';
import { TravelerType } from '../models/traveler.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  checked: boolean = false;

  disabledCelandarStyle: string = "opacity: 0.2; pointer-events: none; user-select: none;";

  calendarStyle: string = this.disabledCelandarStyle;

  minDate: Date;
  maxDate: Date;

  selectedDate_calendar1: Date = new Date() || null;
  selectedTime_calendar1: string = "00:00";

  selectedDate_calendar2: Date = new Date() || null;
  selectedTime_calendar2: string = "00:00";

  fromStationControl = new FormControl();
  toStationControl = new FormControl();

  stations: Station[] = [];
  filteredFromStationOptions!: Observable<Station[]>;
  filteredToStationOptions!: Observable<Station[]>;

  booking: Booking = new Booking();
  fromStation!: Station;
  toStation!: Station;

  constructor(private stationService: StationService, private bookingBuilder: BookingBuilderService, private route: Router) {
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();

    this.minDate = new Date(currentDate);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  setTimeCalendar1(time: string) {
    this.selectedTime_calendar1 = time;
  }

  setTimeCalendar2(time: string) {
    this.selectedTime_calendar2 = time;
  }

  onCheck() {
    if (!this.checked) {
      this.checked = true;

      this.calendarStyle = "";
    }
    else {
      this.checked = false;

      this.calendarStyle = this.disabledCelandarStyle;
    }
  }

  ngOnInit(): void {
    this.getStations();

    this.filteredFromStationOptions = this.fromStationControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.stations.slice()))
    );

      this.filteredToStationOptions = this.toStationControl.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.name)),
        map(name => (name ? this._filter(name) : this.stations.slice())),
    );
  }

  displayFromStation(station: Station): string {
    return station && station.AdvertisedLocationName ? station.AdvertisedLocationName : '';
  }

  displayToStation(station: Station): string {
    this.toStation = station;
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

  selectToStation(e: MatAutocompleteSelectedEvent) {
    this.toStation = e.option.value;
  }

  selectFromStation(e: MatAutocompleteSelectedEvent) {
    this.fromStation = e.option.value;
  }

  submit() {

  }

  getDistanceAndCost() {
    let fromStationCoords = this.fromStation.Coordinates.split(/([() ])/);
    let toStationCoords = this.toStation.Coordinates.split(/([() ])/);

    let fromXCoord = Number(fromStationCoords[4]);
    let fromYCoord = Number(fromStationCoords[6]);

    let toXCoord = Number(toStationCoords[4]);
    let toYCoord = Number(toStationCoords[6]);

    let distance = Math.round(this.calculateDistance(fromYCoord, fromXCoord, toYCoord, toXCoord));
    // let cost =this.getCostForDistance(distance);

    this.booking.FromLocation = this.fromStation;
    this.booking.ToLocation = this.toStation;
    // this.booking.Price = cost;
    this.booking.Distance = distance;

    this.booking.Travelers = [TravelerType.Adult];
    this.bookingBuilder.updateBooking(this.booking);

    this.route.navigateByUrl('/departures');
  }

    calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  showReturnCalender(): void {
    var target = document.getElementById('returnCalender');
    target?.setAttribute("style", "visibility:visible; display:block;");

    var clickedElement = document.getElementById('add-more-trips');
    clickedElement?.setAttribute("style", "visibility:hidden; display:none;");
  }


}
