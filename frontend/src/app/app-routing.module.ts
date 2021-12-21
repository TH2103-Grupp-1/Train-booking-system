import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StationsComponent } from './stations/stations.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { DepartureComponent } from './booking/departureSelection/departure/departure.component'
import { AccountPageComponent } from './account-page/account-page.component';
import { BookingOverviewComponent } from './booking/booking-overview/booking-overview.component';

const routes: Routes = [
  { path: 'stations', component: StationsComponent, canActivate: [AuthGuard] },
  { path: '', component: LandingPageComponent },
  { path: 'departures', component: DepartureComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'overview', component: BookingOverviewComponent }
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule
  ]
})
export class AppRoutingModule { }
