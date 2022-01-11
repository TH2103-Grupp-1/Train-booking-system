import { Station } from "./station.model";
import { TicketReciever } from "./ticketreciever.model";
import { TrainTimeTable } from "./timetable.model";
import { Train } from "./train.model";
import { TravelerType } from "./traveler.model";

export class Booking {
  Id?: number;
  FromLocation?: Station;
  ToLocation?: Station;
  ReturnTrip?: Boolean;
  TimeTable?: TrainTimeTable;
  // DepartureDate?: Date;
  // ReturnTripDate?: Date;
  Travelers?: TravelerType[];
  Train?: Train;
  TicketClass?: string;
  Price?: number;
  Distance?: number;
  DeliveryMethod?: 'Sms' | 'Email';
  TicketReciever?: TicketReciever;
  SeatId?: number;
  SeatNumber?: number;
}

export interface UserBooking {
  DepartureTime: Date;
  ArrivalTime: Date;
  FirstName: string;
  LastName: string;
  Price: number;
  ToLocation: string;
  FromLocation: string;
  TrainType: string;
  Email: string;
  PhoneNumber: string;
}
