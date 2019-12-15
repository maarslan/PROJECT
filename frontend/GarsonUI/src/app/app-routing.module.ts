import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CompanyComponent } from './components/company/company.component';
import { MenuSettingsComponent } from './components/menu-settings/menu-settings.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { TableSettingsComponent } from './components/table-settings/table-settings.component';


const routes: Routes = [{
  path: '', component: AppComponent,
  children: [
    { path: '', component: HomePageComponent },
    { path: 'login', component: LoginComponent },
    // {
    //   path: 'company', component: AppComponent, canActivate: [AuthGuard]
    // }
  ]
},

{
  path: 'company', component: CompanyComponent, canActivate: [AuthGuard],
  children: [
    { path: 'menu-settings', component: MenuSettingsComponent, canActivate: [AuthGuard] },
    { path: 'table-settings', component: TableSettingsComponent, canActivate: [AuthGuard] },
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
