import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  showSpinner = false;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private tokenService: TokenService, ) { }

  ngOnInit() {
    this.init();
  }
  init() {
    this.loginForm = this.fb.group({
      contractNo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  loginCompany() {
    this.showSpinner = true;
    this.authService.logInCompany(this.loginForm.value).subscribe((data) => {
      console.log(data);
      this.tokenService.SetToken(data.token);
      this.loginForm.reset();
      setTimeout(() => {
        this.router.navigate(['company']);
      }, 2000);

    }, err => {
      this.showSpinner = false;
      if (err.error.errorMessage) {
        this.errorMessage = err.errorMessage[0].message;
      }
      if (err.error.errMessage) {
        this.errorMessage = err.error.message;
      }
    });

  }
}
