export interface Ticket {
  id: number;
  ageGroup: string;
  price: number;
}

export interface AgeGroup {
  value: string;
  viewValue: string;
  price: number;
}
