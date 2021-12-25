import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pick-seat',
  templateUrl: './pick-seat.component.html',
  styleUrls: ['./pick-seat.component.css']
})
export class PickSeatComponent implements OnInit {

  constructor() {
    this.booking =
    {
      Travelers: [Traveler.Adult, Traveler.Child],
      Train: {
        name: 'Test', carriages: [
          {
            seats:
              [{ seatNumber: 1 }, { seatNumber: 2 }, { seatNumber: 3 },
              { seatNumber: 4 }, { seatNumber: 5 }, { seatNumber: 6 },
              { seatNumber: 4 }, { seatNumber: 5 }, { seatNumber: 6 },
              { seatNumber: 4 }, { seatNumber: 5 }, { seatNumber: 6 }
              ], number: 1
          },
          {
            seats:
              [{ seatNumber: 4 }, { seatNumber: 5 }, { seatNumber: 6 }],
            number: 2
          },
          {
            seats:
              [{ seatNumber: 1 }, { seatNumber: 2 }, { seatNumber: 3 }],
            number: 3
          },
          {
            seats:
              [{ seatNumber: 1 }, { seatNumber: 2 }, { seatNumber: 3 }],
            number: 4
          },
          {
            seats:
              [{ seatNumber: 1 }, { seatNumber: 2 }, { seatNumber: 3 }],
            number: 5
          },
          {
            seats:
              [{ seatNumber: 1 }, { seatNumber: 2 }, { seatNumber: 3 }],
            number: 6
          }
        ]
      }
    }
  }


  booking: Booking;
  // train!: Train;
  selectedCarriage!: Carriage;
  selectedSeat: number[] = [];
  maxSeats: number = 0;
  ngOnInit(): void {
    this.maxSeats = this.booking.Travelers.length;
  }

  selectCarriage(ca: Carriage) {
    this.selectedSeat = [];
    this.selectedCarriage = ca;
  }

  selectSeat(seat: number) {
    this.selectedSeat.push(seat);
    console.log(this.selectedSeat);
  }

  change(group: any) {
    if (group.value.length >= this.maxSeats) {
      let newValue = group.value;
      newValue.shift();
      group.value = newValue;
      // this.selectedSeat.push(newValue);
      this.selectedSeat = [];

    }
  }
}

// Mock interfaces under, to be removed.

export interface Booking {
  Train: Train,
  Travelers: Traveler[]
}

export enum Traveler {
  Adult,
  Child,
  Student,
  Retired
}
export interface Train {
  name: string;
  carriages: Carriage[];
}

export interface Carriage {
  number: number;
  seats: Seat[]
}

export interface Seat {
  seatNumber: number;
}
