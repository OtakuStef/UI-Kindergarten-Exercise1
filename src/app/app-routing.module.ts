import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KindergartenOverviewComponent } from './kindergarten-overview/kindergarten-overview.component';
import { AddDataComponent } from './dashboard/add-data/add-data.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'signUp', component: AddDataComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'kindergarden', component: KindergartenOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
