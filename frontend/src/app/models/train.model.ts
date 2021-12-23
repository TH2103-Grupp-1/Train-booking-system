import { Carriage } from "./carriage.model";
import { TimeTable } from "./timetable.model";

export interface Train {
  Id?: number;
  Model?: 'Regional' | 'SJ High-speed train X 2000';
  TimeTables?: TimeTable[];
  TrainServices?: string[]; // Wheelchair lift, Bistro, Wifi etc
  Carriage?: Carriage[];
}
