import { Station } from "./station.model";
import { Train } from "./train.model";

export interface Booking {
  Id: number;
  FromLocation: Station;
  ToLocation: Station;
  ReturnTrip: Boolean;
  DepartureDate: Date;
  ReturnTripDate: Date;
  Travelers: Traveler[];
  Trains: Train[];
  TicketClass: string;
  // Seats: number[];
}
