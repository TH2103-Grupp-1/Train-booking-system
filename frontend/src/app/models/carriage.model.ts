import { Seat } from "./seat.model";

export interface Carriage {
  Id?: number;
  Seats?: Seat[];
  IsFirstClass?: boolean;
}
