import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HeaderComponent } from './header/header.component';
import { AngularMaterialModule } from './materialmodule/angularmaterial.module';
import { TaxComponent } from './lists/taxcomponent/tax/tax.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PaginationComponent } from './pagination/pagination.component';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TaxinfoComponent } from './lists/taxcomponent/taxinfo/taxinfo.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { PurchasemanagementComponent } from './vouchers/purchase/purchasemanagement/purchasemanagement.component';
import { PurchasedetailinfoComponent } from './vouchers/purchase/purchasedetailinfo/purchasedetailinfo.component';
import { UnitComponent } from './lists/unitcomponent/unit/unit.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComfirmDialogComponent } from './common/comfirm-dialog/comfirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    HeaderComponent,
    TaxComponent,
    PaginationComponent,
    TaxinfoComponent,
    PurchasemanagementComponent,
    PurchasedetailinfoComponent,
    UnitComponent,
    ComfirmDialogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AngularMaterialModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'tax', component: TaxComponent },
      { path: 'unit', component: UnitComponent },
      { path: 'purchase', component: PurchasemanagementComponent },
      {
        path: 'purchaseinvoice',
        component: PurchasedetailinfoComponent
      },
      {
        path: 'purchaseinvoice/:id',
        component: PurchasedetailinfoComponent
      }
    ]),
    MDBBootstrapModule.forRoot(),
    NgbModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgbDatepickerModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:
    [
      TaxinfoComponent,
      ComfirmDialogComponent
    ],

})
export class AppModule { }
