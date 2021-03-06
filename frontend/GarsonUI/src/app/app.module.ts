import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './components/company/company.component';
import { MenuSettingsComponent } from './components/menu-settings/menu-settings.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptor } from './services/token-interceptor.service';
import { TokenService } from './services/token.service';
import { TableSettingsComponent } from './components/table-settings/table-settings.component';
import { ApplyFormComponent } from './components/apply-form/apply-form.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { CompanyPasswordComponent } from './components/company-password/company-password.component';
import { FileUploadModule } from 'ng2-file-upload';
@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    MenuSettingsComponent,
    HomePageComponent,
    LoginComponent,
    TableSettingsComponent,
    ApplyFormComponent,
    CompanyInfoComponent,
    CompanyPasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  providers: [CookieService, TokenService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
