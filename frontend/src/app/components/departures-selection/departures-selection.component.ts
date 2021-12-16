import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departures-selection',
  templateUrl: './departures-selection.component.html',
  styleUrls: ['./departures-selection.component.css']
})
export class DeparturesSelectionComponent implements OnInit {

  items = [

    'avgång',
    "--:--",
    "pris"


  ]



  constructor() { }

  ngOnInit(): void {
  }

}
