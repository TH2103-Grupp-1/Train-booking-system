import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { BookingBuilderService } from 'src/app/services/booking-builder.service';

@Component({
  selector: 'app-booking-overview',
  templateUrl: './booking-overview.component.html',
  styleUrls: ['./booking-overview.component.css']
})
export class BookingOverviewComponent implements OnInit {

  booking!: Booking;

  constructor(private bookingService: BookingBuilderService, private route: Router) {
    this.booking = bookingService.getBooking();
    if(this.booking === undefined) { route.navigateByUrl('/'); }
   }

  ngOnInit(): void {
   
  }


  getTravelTime(): string{
    let ArrivalTime = this.booking.TimeTable?.ArrivalTime?.toString().replace(':', "");
    let DepartureTime = this.booking.TimeTable?.DepartureTime?.toString().replace(':', "");

   // let departureTime = new Date(DepartureTime?.getHours()!, DepartureTime?.getMinutes()!);
    //let arrivalTime = new Date(ArrivalTime?.getHours()!, ArrivalTime?.getMinutes()!);
    let arrTime = Date.parse(ArrivalTime!);
    let depTime = Date.parse(DepartureTime!);

    //let timeDiff = this.msToHMS(Math.abs(+ArrivalTime! - +DepartureTime!));
    let msDiff = arrTime! - depTime!;
    let timeDiff = this.msToHMS(msDiff);
    
    //document.getElementById("travelTimePhone")!.innerHTML = timeDiff;
    //document.getElementById("travelTimeDesktop")!.innerHTML = timeDiff;

    return timeDiff;
  }

   msToHMS(ms: number): string{
  
    let seconds = ms / 1000;
  
    let hours = Math.floor(seconds / 3600); 
  
    let minutes = Math.floor(seconds - (hours * 3600)) / 60; 
   
    let time = hours.toString() + ':' +  minutes.toString();

    return time;
}

getDepartureDate(): string{
  let formatedDate = Date.parse(this.booking.TimeTable!.DepartureTime!.toString().replace(':', ""));
  let date = new Date(formatedDate).toString();

  let matches = /([^-]+):([^-]+):([^-]+)/.exec(date);
  return matches![1] + ':' + matches![2];
}

iconTogglePhone(){
  
  document.getElementById('iconPhone')?.classList.toggle('fa-caret-up');  
}
iconToggleDesktop(){
  
  document.getElementById('iconDesktop1')?.classList.toggle('fa-caret-left');  
}

  submit() {
    this.route.navigateByUrl('/payment');
  }

}
