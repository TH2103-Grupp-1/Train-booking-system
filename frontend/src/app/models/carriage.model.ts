import { Seat } from "./seat.model";

export interface Carriage {
  Id?: number;
  CarriageType?: 'Restaurant' | 'Regular';
  Seats?: Seat[];
}
