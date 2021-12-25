import { Station } from "./station.model";
import { TicketReciever } from "./ticketreciever.model";
import { Train } from "./train.model";
import { TravelerType } from "./traveler.model";

export class Booking {
  Id?: number;
  FromLocation?: Station;
  ToLocation?: Station;
  ReturnTrip?: Boolean;
  DepartureDate?: Date;
  ReturnTripDate?: Date;
  Travelers?: TravelerType[];
  Trains?: Train[];
  TicketClass?: string;
  Price?: number;
  Distance?: number;
  DeliveryMethod?: 'Sms' | 'Email';
  TicketReciever?: TicketReciever;

}
