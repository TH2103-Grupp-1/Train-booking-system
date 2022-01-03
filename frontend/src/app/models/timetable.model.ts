export interface TrainTimeTable {
  Id?: number;
  // DepartureStation?: Station;
  DepartureTime?: Date;
  // ArrivalStation?: Station;
  ArrivalTime?: Date;
  TrainId: number;
  TrainType: string;
  BasePrice: number;
  Speed: number;
  PriceTotal?: number;
}
