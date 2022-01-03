import { Carriage } from "./carriage.model";
import { TrainTimeTable } from "./timetable.model";

export interface Train {
  TrainId?: number;
  TrainType?: string;
  BasePrice?: number;
  Speed?: number;
  TrainServices?: string[]; // Wheelchair lift, Bistro, Wifi etc
  Carriages?: Carriage[];
}
