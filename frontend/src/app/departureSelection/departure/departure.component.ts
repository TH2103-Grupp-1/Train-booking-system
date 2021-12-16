import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departure',
  templateUrl: './departure.component.html',
  styleUrls: ['./departure.component.css']
})
export class DepartureComponent implements OnInit {

  tableData = [
    { "id": 1, "departure": "07:45", "secondClass": "pris", "firstClass": "pris" },
    { "id": 2, "departure": "08:45", "secondClass": "pris", "firstClass": "pris" },
    { "id": 3, "departure": "09:45", "secondClass": "pris", "firstClass": "pris" },
    { "id": 4, "departure": "10:45", "secondClass": "pris", "firstClass": "pris" },
    { "id": 5, "departure": "11:45", "secondClass": "pris", "firstClass": "pris" }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
