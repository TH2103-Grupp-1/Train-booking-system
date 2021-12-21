import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StationsComponent } from './stations/stations.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { DepartureComponent } from './booking/departureSelection/departure/departure.component'
import { AccountPageComponent } from './account-page/account-page.component';

const routes: Routes = [
  { path: 'stations', component: StationsComponent, canActivate: [AuthGuard] },
  { path: '', component: LandingPageComponent },
  { path: 'departures', component: DepartureComponent },
  { path: 'account', component: AccountPageComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule
  ]
})
export class AppRoutingModule { }
