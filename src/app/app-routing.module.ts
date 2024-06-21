import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { OrdersComponent } from './orders/orders.component';
import { CargoPortalComponent } from './cargo-portal/cargo-portal.component';
import { SenderPortalComponent } from './sender-portal/sender-portal.component';
import { AdminWareHouseComponent } from './admin-ware-house/admin-ware-house.component';
import { WareHouseLoginComponent } from './ware-house-login/ware-house-login.component';
import { WareHousePortalComponent } from './ware-house-portal/ware-house-portal.component';
import { AdminGatePassComponent } from './admin-gate-pass/admin-gate-pass.component';
import { ReceiverPortalComponent } from './receiver-portal/receiver-portal.component';
import { WareHouseInventoryComponent } from './ware-house-inventory/ware-house-inventory.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'user-login',component:UserLoginComponent},
  {path:'user-portal',component:UserPortalComponent},
  {path:'adminLogin',component:AdminLoginComponent},
  {path:'admin-portal',component:AdminPortalComponent},
  {path:'adminGatePassPortal',component:AdminGatePassComponent},
  {path:'ordersPortal',component:OrdersComponent},
  {path:'cargoPortal',component:CargoPortalComponent},
  {path:'sender-dashboard',component:SenderPortalComponent},
  {path:'adminWareHouse',component:AdminWareHouseComponent},
  {path:'warehouseLogin',component:WareHouseLoginComponent},
  {path:'warehouse-portal',component:WareHousePortalComponent},
  {path:'receiver-dashboard',component:ReceiverPortalComponent},
  {path:'warehouse-inventoty',component:WareHouseInventoryComponent},
  {path:'adminCustomerPortal',component:AdminCustomersComponent},
  {path:'reportDownload',component:ReportComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
