import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StationsComponent } from './stations/stations.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AccountPageComponent } from './account-page/account-page.component';
import { BookingOverviewComponent } from './booking/booking-overview/booking-overview.component';
import { PickSeatComponent } from './booking/pick-seat/pick-seat.component';


const routes: Routes = [
  { path: 'stations', component: StationsComponent, canActivate: [AuthGuard]},
  { path: '', component: LandingPageComponent},
  { path: 'account', component: AccountPageComponent},
  { path: 'overview', component: BookingOverviewComponent},
  { path: 'seat', component: PickSeatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule
  ]
})
export class AppRoutingModule { }
