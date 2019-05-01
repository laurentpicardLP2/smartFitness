import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatVideoModule } from 'mat-video';
import { EmbedVideo } from 'ngx-embed-video';

import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { SeanceBookingComponent } from './booking/seance-booking/seance-booking.component';
import { TokenStorageService } from './services/token-storage.service';
import { CustomerNewComponent } from './user/customer-new/customer-new.component';
import { FacilityBookingComponent } from './booking/facility-booking/facility-booking.component';
import { FacilityCategoryBookingComponent } from './booking/facility-category-booking/facility-category-booking.component';
import { LoginComponent } from './user/login/login.component';
import { TimestampFacilityComponent } from './booking/timestamp-facility/timestamp-facility.component';
import { CommandListingComponent } from './synthese/command-listing/command-listing.component';
import { SeanceListingComponent } from './synthese/seance-listing/seance-listing.component';
import { SeanceDetailComponent } from './synthese/seance-detail/seance-detail.component';
import { FacilityNewComponent } from './manager/facility-new/facility-new.component';
import { HomeComponent } from './user/home/home.component';
import { AuthGuardCustomerService } from './services/auth-guard-customer.service';
import { AuthGuardManagerService } from './services/auth-guard-manager.service';
import { AuthGuardAdminService } from './services/auth-guard-admin.service';
import { RoomNewComponent } from './manager/room-new/room-new.component';
import { FacilityCategoryNewComponent } from './manager/facility-category-new/facility-category-new.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RoomListingComponent } from './manager/room-listing/room-listing.component';
import { RoomDetailComponent } from './manager/room-detail/room-detail.component';
import { FacilityCategoryListingComponent } from './manager/facility-category-listing/facility-category-listing.component';
import { FacilityCategoryDetailComponent } from './manager/facility-category-detail/facility-category-detail.component';
import { FacilityListingComponent } from './manager/facility-listing/facility-listing.component';
import { PaypalComponent } from './booking/paypal/paypal.component';
import { FacilityDetailComponent } from './manager/facility-detail/facility-detail.component';
import { UploadComponent } from './upload/upload.component';
import { StaffNewComponent } from './admin/staff-new/staff-new.component';
import { StaffListingComponent } from './admin/staff-listing/staff-listing.component';
import { StaffDetailComponent } from './admin/staff-detail/staff-detail.component';
import { SubscriptionCategoryNewComponent } from './manager/subscription-category-new/subscription-category-new.component';
import { SubscriptionCategoryListingComponent } from './manager/subscription-category-listing/subscription-category-listing.component';
import { SubscriptionCategoryDetailComponent } from './manager/subscription-category-detail/subscription-category-detail.component';
import { SubscriptionCustomerNewComponent } from './offres/subscription-customer-new/subscription-customer-new.component';
import { SubscriptionCustomerPropositionComponent } from './offres/subscription-customer-proposition/subscription-customer-proposition.component';
import { SubscriptionCustomerHistoricComponent } from './offres/subscription-customer-historic/subscription-customer-historic.component';
import { WatchCustomerPropositionComponent } from './offres/watch-customer-proposition/watch-customer-proposition.component';
import { WatchCategoryNewComponent } from './manager/watch-category-new/watch-category-new.component';
import { WatchCategoryListingComponent } from './manager/watch-category-listing/watch-category-listing.component';
import { WatchCategoryDetailComponent } from './manager/watch-category-detail/watch-category-detail.component';
import { MonthlyRateBookingComponent } from './manager/monthly-rate-booking/monthly-rate-booking.component';
import { CommandDetailComponent } from './synthese/command-detail/command-detail.component';
import { WatchDetailComponent } from './synthese/watch-detail/watch-detail.component';
import { FacilityMaintenanceComponent } from './manager/facility-maintenance/facility-maintenance.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { BalanceByFacilityComponent } from './manager/balance-by-facility/balance-by-facility.component';
import { CartCompositionComponent } from './synthese/cart-composition/cart-composition.component';
import { AcknowledgmentComponent } from './booking/acknowledgment/acknowledgment.component';
import { SignupConfirmComponent } from './user/signup-confirm/signup-confirm.component';
import { OurActivityComponent } from './user/our-activity/our-activity.component';
import { OurLocalisationComponent } from './user/our-localisation/our-localisation.component';
import { EvenementNewComponent } from './manager/evenement-new/evenement-new.component';
import { EvenementListingComponent } from './manager/evenement-listing/evenement-listing.component';
import { EvenementDetailComponent } from './manager/evenement-detail/evenement-detail.component';
import { EvenementDetailUserComponent } from './user/evenement-detail-user/evenement-detail-user.component';
import { ProductCategoryNewComponent } from './manager/product-category-new/product-category-new.component';
import { ProductCategoryListingComponent } from './manager/product-category-listing/product-category-listing.component';
import { ProductCategoryDetailComponent } from './manager/product-category-detail/product-category-detail.component';
import { ProductRefNewComponent } from './manager/product-ref-new/product-ref-new.component';
import { ProductRefListingComponent } from './manager/product-ref-listing/product-ref-listing.component';
import { ProductRefDetailComponent } from './manager/product-ref-detail/product-ref-detail.component';
import { FavoriteProductComponent } from './booking/favorite-product/favorite-product.component';
import { ProductListingComponent } from './booking/product-listing/product-listing.component';
import { ProductDetailComponent } from './booking/product-detail/product-detail.component';
import { ProductCustomerHistoricComponent } from './synthese/product-customer-historic/product-customer-historic.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    SeanceBookingComponent,
    CustomerNewComponent,
    FacilityBookingComponent,
    FacilityCategoryBookingComponent,
    LoginComponent,
    TimestampFacilityComponent,
    CommandListingComponent,
    SeanceListingComponent,
    SeanceDetailComponent,
    FacilityNewComponent,
    HomeComponent,
    RoomNewComponent,
    FacilityCategoryNewComponent,
    ErrorPageComponent,
    RoomListingComponent,
    RoomDetailComponent,
    FacilityCategoryListingComponent,
    FacilityCategoryDetailComponent,
    FacilityListingComponent,
    PaypalComponent,
    FacilityDetailComponent,
    UploadComponent,
    StaffNewComponent,
    StaffListingComponent,
    StaffDetailComponent,
    SubscriptionCategoryNewComponent,
    SubscriptionCategoryListingComponent,
    SubscriptionCategoryDetailComponent,
    SubscriptionCustomerNewComponent,
    SubscriptionCustomerPropositionComponent,
    SubscriptionCustomerHistoricComponent,
    WatchCustomerPropositionComponent,
    WatchCategoryNewComponent,
    WatchCategoryListingComponent,
    WatchCategoryDetailComponent,
    MonthlyRateBookingComponent,
    CommandDetailComponent,
    WatchDetailComponent,
    FacilityMaintenanceComponent,
    BalanceByFacilityComponent,
    CartCompositionComponent,
    AcknowledgmentComponent,
    SignupConfirmComponent,
    OurActivityComponent,
    OurLocalisationComponent,
    EvenementNewComponent,
    EvenementListingComponent,
    EvenementDetailComponent,
    EvenementDetailUserComponent,
    ProductCategoryNewComponent,
    ProductCategoryListingComponent,
    ProductCategoryDetailComponent,
    ProductRefNewComponent,
    ProductRefListingComponent,
    ProductRefDetailComponent,
    FavoriteProductComponent,
    ProductListingComponent,
    ProductDetailComponent,
    ProductCustomerHistoricComponent,

  ],
  imports: [
    BrowserModule,
    MatVideoModule,
    EmbedVideo.forRoot(),
    MatGoogleMapsAutocompleteModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAPOsreRHHdYcdZ4pX7YNXBujTndpGJF9k'
    }),
    MatCarouselModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatIconModule,
    FlexLayoutModule,
    NgxPayPalModule,
    
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [
    TokenStorageService,
    AuthGuardCustomerService,
    AuthGuardManagerService,
    AuthGuardAdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
