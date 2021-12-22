import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pick-seat',
  templateUrl: './pick-seat.component.html',
  styleUrls: ['./pick-seat.component.css']
})
export class PickSeatComponent implements OnInit {

  constructor() {
    this.train =
    {
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



  train: Train;
  selectedCarriage!: Carriage;
  selectedSeat: number = 0;

  ngOnInit(): void {
    console.log(this.selectedCarriage);
  }

  selectCarriage(ca: Carriage) {
    this.selectedSeat = 0;
    this.selectedCarriage = ca;
    console.log(this.selectedSeat);
  }

  selectSeat(seat: number) {
    this.selectedSeat = seat;
  }
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
