import { Station } from "./station.model";

export interface TimeTable {
  Id?: number;
  DepartureStation?: Station;
  DepartureTime?: Date;
  ArrivalStation?: Station;
  ArrivalTime?: Date;
}
