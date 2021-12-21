import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  checked: boolean = false;

  disabledCelandarStyle: string = "opacity: 0.2; pointer-events: none; user-select: none;";

  calendarStyle: string = this.disabledCelandarStyle;

  constructor() { }

  onCheck() {
    if (!this.checked) {
      this.checked = true;

      this.calendarStyle = "";
    }
    else if (this.checked) {
      this.checked = false;

      this.calendarStyle = this.disabledCelandarStyle;
    }
    
  }

  ngOnInit(): void {
  }

  

}
