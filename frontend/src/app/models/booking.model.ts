import { Station } from "./station.model";
import { TicketReciever } from "./ticketreciever.model";
import { TimeTable } from "./timetable.model";
import { Train } from "./train.model";
import { TravelerType } from "./traveler.model";

export class Booking {
  Id?: number;
  FromLocation?: Station;
  ToLocation?: Station;
  ReturnTrip?: Boolean;
  TimeTable?: TimeTable;
  // DepartureDate?: Date;
  // ReturnTripDate?: Date;
  Travelers?: TravelerType[];
  Train?: Train;
  TicketClass?: string;
  Price?: number;
  Distance?: number;
  DeliveryMethod?: 'Sms' | 'Email';
  TicketReciever?: TicketReciever;

}
