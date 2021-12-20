import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StationsComponent } from './stations/stations.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AuthModule } from './auth/auth.module';
import { Notyf } from 'notyf';
import { notyfFactory } from './shared/guards/notyf.token';
import { ErrorInterceptor } from './shared/guards/interceptors/error-interceptor';
import { AccountPageComponent } from './account-page/account-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingOverviewComponent } from './booking/booking-overview/booking-overview.component';
import { OrderConfirmationComponent } from './booking/order-confirmation/order-confirmation.component';
import { PaymentComponent } from './booking/payment/payment.component';
import { PickSeatComponent } from './booking/pick-seat/pick-seat.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translations/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    StationsComponent,
    NavbarComponent,
    LandingPageComponent,
    AccountPageComponent,
    BookingOverviewComponent,
    OrderConfirmationComponent,
    PaymentComponent,
    PickSeatComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: Notyf, useFactory: notyfFactory },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
