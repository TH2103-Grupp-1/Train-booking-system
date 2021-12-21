import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departure',
  templateUrl: './departure.component.html',
  styleUrls: ['./departure.component.css']
})
export class DepartureComponent implements OnInit {



  //testa data for departures 
  tableData = [
    { "id": 1, "departure": "07:45", "secondClass": "pris", "firstClass": "pris" },
    { "id": 2, "departure": "08:45", "secondClass": "pris", "firstClass": "pris" },
    { "id": 3, "departure": "09:45", "secondClass": "pris", "firstClass": "pris" },
    { "id": 4, "departure": "10:45", "secondClass": "pris", "firstClass": "pris" },
    { "id": 5, "departure": "11:45", "secondClass": "pris", "firstClass": "pris" },
    { "id": 6, "departure": "17:45", "secondClass": "pris", "firstClass": "pris" },
    { "id": 7, "departure": "18:45", "secondClass": "pris", "firstClass": "pris" },
    { "id": 8, "departure": "19:45", "secondClass": "pris", "firstClass": "pris" },
    { "id": 9, "departure": "20:45", "secondClass": "pris", "firstClass": "pris" },
    { "id": 10, "departure": "11:30", "secondClass": "pris", "firstClass": "pris" },
    { "id": 11, "departure": "07:30", "secondClass": "pris", "firstClass": "pris" },
    { "id": 12, "departure": "08:30", "secondClass": "pris", "firstClass": "pris" },
    { "id": 13, "departure": "09:45", "secondClass": "pris", "firstClass": "pris" },
    { "id": 14, "departure": "10:20", "secondClass": "pris", "firstClass": "pris" },
    { "id": 15, "departure": "11:25", "secondClass": "pris", "firstClass": "pris" },
    { "id": 16, "departure": "07:40", "secondClass": "pris", "firstClass": "pris" },
    { "id": 17, "departure": "08:30", "secondClass": "pris", "firstClass": "pris" },
    { "id": 18, "departure": "09:30", "secondClass": "pris", "firstClass": "pris" },
    { "id": 19, "departure": "10:10", "secondClass": "pris", "firstClass": "pris" },
    { "id": 20, "departure": "11:15", "secondClass": "pris", "firstClass": "pris" },
  ]

  constructor() { }

  // sets panel false to for use to our accordion
  panelExpanded = false;

  selectedDepartureId: number = 0

  //PaginationService
  totalLength: any;
  page: number = 1;

  selectDeparture(id: number) {

    this.selectedDepartureId = id;

  }


  ngOnInit(): void {

    //get total length of table
    this.totalLength = this.tableData.length

  }

}
