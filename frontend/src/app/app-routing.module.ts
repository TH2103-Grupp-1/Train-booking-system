import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { StationsComponent } from './components/stations/stations.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { DepartureComponent } from './booking/departure/departure.component'
import { AccountPageComponent } from './account/account-page/account-page.component';
import { PaymentComponent } from './booking/payment/payment.component';
import { BookingOverviewComponent } from './booking/booking-overview/booking-overview.component';
import { OrderConfirmationComponent } from './booking/order-confirmation/order-confirmation.component';
import { PickSeatComponent } from './booking/pick-seat/pick-seat.component';
import { UserBookingsComponent } from './account/user-bookings/user-bookings.component';

const routes: Routes = [
  { path: 'stations', component: StationsComponent, canActivate: [AuthGuard]},
  { path: '', component: LandingPageComponent},
  { path: 'account', component: AccountPageComponent, children: [{ path: 'bookings', component: UserBookingsComponent}]},
  { path: 'payment', component: PaymentComponent },
  { path: 'overview', component: BookingOverviewComponent},
  { path: 'confirmation' ,component: OrderConfirmationComponent},
  { path: 'departures', component: DepartureComponent },
  { path: 'seat', component: PickSeatComponent },
  { path: 'stripe', component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule
  ]
})
export class AppRoutingModule { }
