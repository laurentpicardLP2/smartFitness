import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerNewComponent } from './user/customer-new/customer-new.component';
import { SeanceBookingComponent } from './booking/seance-booking/seance-booking.component';
import { FacilityCategoryBookingComponent } from './booking/facility-category-booking/facility-category-booking.component';
import { FacilityBookingComponent } from './booking/facility-booking/facility-booking.component';
import { LoginComponent } from './user/login/login.component';
import { CommandListingComponent } from './synthese/command-listing/command-listing.component';
import { SeanceListingComponent } from './synthese/seance-listing/seance-listing.component';
import { SeanceDetailComponent } from './synthese/seance-detail/seance-detail.component';
import { FacilityNewComponent } from './manager/facility-new/facility-new.component';
import { TimestampFacilityComponent } from './booking/timestamp-facility/timestamp-facility.component';
import { HomeComponent } from './user/home/home.component';
import { AuthGuardCustomerService } from './services/auth-guard-customer.service';
import { AuthGuardManagerService } from './services/auth-guard-manager.service';
import { AuthGuardAdminService } from './services/auth-guard-admin.service';

const routes: Routes = [
  { path: 'customer-new', component: CustomerNewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'command-listing', canActivate: [AuthGuardCustomerService], component: CommandListingComponent },
  { path: 'seance-listing', canActivate: [AuthGuardCustomerService], component: SeanceListingComponent },
  { path: 'seance-detail/:idItem', canActivate: [AuthGuardCustomerService], component: SeanceDetailComponent},
  { path: 'facility-new', canActivate: [AuthGuardManagerService], component: FacilityNewComponent},
  { path: 'chart', canActivate: [AuthGuardManagerService], component: TimestampFacilityComponent },
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
