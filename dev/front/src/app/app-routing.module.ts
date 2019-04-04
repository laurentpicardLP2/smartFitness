import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerNewComponent } from './user/customer-new/customer-new.component';
import { SeanceBookingComponent } from './booking/seance-booking/seance-booking.component';
import { FacilityCategoryBookingComponent } from './booking/facility-category-booking/facility-category-booking.component';
import { FacilityCategoryListingComponent } from './manager/facility-category-listing/facility-category-listing.component';
import { FacilityCategoryNewComponent } from './manager/facility-category-new/facility-category-new.component';
import { FacilityCategoryDetailComponent } from './manager/facility-category-detail/facility-category-detail.component';
import { FacilityBookingComponent } from './booking/facility-booking/facility-booking.component';
import { LoginComponent } from './user/login/login.component';
import { CommandListingComponent } from './synthese/command-listing/command-listing.component';
import { SeanceListingComponent } from './synthese/seance-listing/seance-listing.component';
import { SeanceDetailComponent } from './synthese/seance-detail/seance-detail.component';
import { FacilityNewComponent } from './manager/facility-new/facility-new.component';
import { FacilityListingComponent } from './manager/facility-listing/facility-listing.component';
import { FacilityDetailComponent } from './manager/facility-detail/facility-detail.component';
import { TimestampFacilityComponent } from './booking/timestamp-facility/timestamp-facility.component';
import { HomeComponent } from './user/home/home.component';
import { RoomNewComponent } from './manager/room-new/room-new.component';
import { AuthGuardCustomerService } from './services/auth-guard-customer.service';
import { AuthGuardManagerService } from './services/auth-guard-manager.service';
import { AuthGuardAdminService } from './services/auth-guard-admin.service';
import { RoomListingComponent } from './manager/room-listing/room-listing.component';
import { RoomDetailComponent } from './manager/room-detail/room-detail.component';
import { UploadComponent } from './upload/upload.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PaypalComponent } from './booking/paypal/paypal.component';
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

const routes: Routes = [
  { path: 'error-page', component: ErrorPageComponent },
  { path: 'upload/:data', component: UploadComponent },
  { path: 'customer-new', component: CustomerNewComponent },
  { path: 'staff-new', canActivate: [AuthGuardAdminService], component: StaffNewComponent },
  { path: 'staff-listing', canActivate: [AuthGuardAdminService], component: StaffListingComponent },
  { path: 'staff-detail/:username', canActivate: [AuthGuardAdminService], component: StaffDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'command-listing', canActivate: [AuthGuardCustomerService], component: CommandListingComponent },
  { path: 'seance-listing', canActivate: [AuthGuardCustomerService], component: SeanceListingComponent },
  { path: 'seance-detail/:idItem', canActivate: [AuthGuardCustomerService], component: SeanceDetailComponent},
  { path: 'facility-new', canActivate: [AuthGuardManagerService], component: FacilityNewComponent},
  { path: 'facility-listing', canActivate: [AuthGuardManagerService], component: FacilityListingComponent},
  { path: 'facility-detail/:idFacility', canActivate: [AuthGuardManagerService], component: FacilityDetailComponent},
  { path: 'facility-category-new', canActivate: [AuthGuardManagerService], component: FacilityCategoryNewComponent},
  { path: 'facility-category-listing', canActivate: [AuthGuardManagerService], component: FacilityCategoryListingComponent},
  { path: 'facility-category-detail/:idFacilityCategory', canActivate: [AuthGuardManagerService], component: FacilityCategoryDetailComponent},
  { path: 'room-new', canActivate: [AuthGuardManagerService], component: RoomNewComponent},
  { path: 'room-listing', canActivate: [AuthGuardManagerService], component: RoomListingComponent},
  { path: 'room-detail/:idRoom', canActivate: [AuthGuardManagerService], component: RoomDetailComponent},
  { path: 'subscription-category-new', canActivate: [AuthGuardManagerService], component: SubscriptionCategoryNewComponent},
  { path: 'subscription-category-listing', canActivate: [AuthGuardManagerService], component: SubscriptionCategoryListingComponent},
  { path: 'subscription-category-detail/:idSubscriptionCategory', canActivate: [AuthGuardManagerService], component: SubscriptionCategoryDetailComponent},
  { path: 'watch-category-new', canActivate: [AuthGuardManagerService], component: WatchCategoryNewComponent},
  { path: 'watch-category-listing', canActivate: [AuthGuardManagerService], component: WatchCategoryListingComponent},
  { path: 'watch-category-detail/:idWatchCategory', canActivate: [AuthGuardManagerService], component: WatchCategoryDetailComponent},
  { path: 'subscription-customer-new/:idSubscriptionCategory/:nbLastSubscription/:typeLastSubscription', canActivate: [AuthGuardCustomerService], component: SubscriptionCustomerNewComponent },
  { path: 'subscription-customer-proposition', canActivate: [AuthGuardCustomerService], component: SubscriptionCustomerPropositionComponent },
  { path: 'subscription-customer-historic', canActivate: [AuthGuardCustomerService], component: SubscriptionCustomerHistoricComponent },
  { path: 'watch-customer-proposition', canActivate: [AuthGuardCustomerService], component: WatchCustomerPropositionComponent },
  { path: 'chart',  component: TimestampFacilityComponent },
  { path: 'paypal',  component: PaypalComponent },
  { path: '', component: HomeComponent },
  
  //{ path: 'seance-booking', component: SeanceBookingComponent},
  //{ path: 'facility-category-booking', component: FacilityCategoryBookingComponent},
  //{ path: 'facility-booking', component: FacilityBookingComponent, outlet: 'booking-router-outlet' }

  { path: 'seance-booking', canActivate: [AuthGuardCustomerService], component: SeanceBookingComponent, children: [
    { path: 'facility-category-booking', canActivate: [AuthGuardCustomerService], component: FacilityCategoryBookingComponent, outlet: 'facility-category-router-outlet' },
    { path: 'facility-booking', canActivate: [AuthGuardCustomerService], component: FacilityBookingComponent, outlet: 'facility-router-outlet' }] }

    // { path: 'seance-booking', component: SeanceBookingComponent, children: [
    //   { path: ':timestamp', component: FacilityCategoryBookingComponent, outlet: 'booking-router-outlet' }, 
    // ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
