import { Seat } from "./seat.model";

export interface Carriage {
  Id?: number;
  CarriageNumber?: number;
  Seats?: Seat[];
  IsFirstClass?: boolean;
}
