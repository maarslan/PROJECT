import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { TokenService } from 'src/app/services/token.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';

declare var jQuery: any;
@Component({
  selector: 'app-company-password',
  templateUrl: './company-password.component.html',
  styleUrls: ['./company-password.component.css']
})
export class CompanyPasswordComponent implements OnInit {
  company: any;
  passwordForm: FormGroup;
  constructor(
    private tokenService: TokenService,
    private fb: FormBuilder,
    private companyService: CompanyService) { }

  ngOnInit() {
    this.company = this.tokenService.GetPayload();
    this.init();
  }
  init() {
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
  changePassword() {
    this.companyService.changePassword(this.passwordForm.value).subscribe(data => {
      console.log(data);
      this.passwordForm.reset();
    });
  }
}
