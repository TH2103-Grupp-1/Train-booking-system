import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StationsComponent } from './stations/stations.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  { path: 'stations', component: StationsComponent, canActivate: [AuthGuard]},
  { path: '', component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,
    TranslateModule
  ]
})
export class AppRoutingModule { }
