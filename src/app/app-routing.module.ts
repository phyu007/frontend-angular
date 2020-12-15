import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { ExcessInventoryComponent } from './excess-inventory/excess-inventory.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { PerformanceSummaryComponent } from './performance-summary/performance-summary.component';
import { ProductsComponent } from './products/products.component';
import { StockComponent } from './stock/stock.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { SkuPerformaceComponent } from './sku-performace/sku-performace.component';
import { PerformanceValidComponent } from './performance-valid/performance-valid.component';
import { OverallComponent } from './overall/overall.component';
import { DataTableComponent } from './data-table/data-table.component';
import { ClaimDetailComponent } from './claim-detail/claim-detail.component';
import {ClaimHistoryComponent } from './claim-history/claim-history.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [ 
{ path: 'login', component: LoginComponent},
{ path: '',component: ExcessInventoryComponent,canActivate :[AuthGuard],},
{ path: 'main-nav',component: MainNavComponent}, 
{ path: 'dashboard',component: DashboardComponent},
{ path: 'performance',component: PerformanceSummaryComponent},
{ path: 'products',component: ProductsComponent},
{ path: 'stock',component: StockComponent},
{ path: 'check-out',component: CheckOutComponent},   
{ path: 'excess-inventory', component: HomeComponent},
{ path: 'sku-performace', component: SkuPerformaceComponent },
{ path: 'performance-validation', component: PerformanceValidComponent }, 
{ path: 'overall', component: OverallComponent }, 
{ path: 'data-table', component: DataTableComponent },
{ path: 'claimhistory', component: ClaimHistoryComponent },
{ path: 'claimdetail', component: ClaimDetailComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




