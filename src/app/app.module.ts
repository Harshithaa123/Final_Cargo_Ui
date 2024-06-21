import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { OrdersComponent } from './orders/orders.component';
import { HttpClientModule } from '@angular/common/http';
import { CargoPortalComponent } from './cargo-portal/cargo-portal.component';
import { SenderPortalComponent } from './sender-portal/sender-portal.component';
import { AdminWareHouseComponent } from './admin-ware-house/admin-ware-house.component';
import { WareHouseLoginComponent } from './ware-house-login/ware-house-login.component';
import { WareHousePortalComponent } from './ware-house-portal/ware-house-portal.component';
import { AdminGatePassComponent } from './admin-gate-pass/admin-gate-pass.component';
import { ReceiverPortalComponent } from './receiver-portal/receiver-portal.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';
import { WareHouseInventoryComponent } from './ware-house-inventory/ware-house-inventory.component';
import { ReportComponent } from './report/report.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserLoginComponent,
    UserPortalComponent,
    AdminLoginComponent,
    AdminPortalComponent,
    OrdersComponent,
    CargoPortalComponent,
    SenderPortalComponent,
    AdminWareHouseComponent,
    WareHouseLoginComponent,
    WareHousePortalComponent,
    AdminGatePassComponent,
    ReceiverPortalComponent,
    AdminCustomersComponent,
    WareHouseInventoryComponent,
    ReportComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
