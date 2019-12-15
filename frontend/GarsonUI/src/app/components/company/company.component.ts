import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
declare var jQuery: any;
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  isMenuSettings = false;
  isTableSettings = false;
  company: any;
  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    this.company = this.tokenService.GetPayload();
    // tslint:disable-next-line: no-shadowed-variable
    this.toggleSideNav();
  }

  shiftToMenu() {
    this.isMenuSettings = true;
  }
  shiftToTables() {
    this.isTableSettings = true;
  }
  logOut() {
    this.tokenService.DeleteToken();
    this.router.navigate(['']);
  }
  toggleSideNav() {
    jQuery(($) => {

      $('.sidebar-dropdown > a').click(function () {
        $('.sidebar-submenu').slideUp(200);
        if (
          $(this)
            .parent()
            .hasClass('active')
        ) {
          $('.sidebar-dropdown').removeClass('active');
          $(this)
            .parent()
            .removeClass('active');
        } else {
          $('.sidebar-dropdown').removeClass('active');
          $(this)
            .next('.sidebar-submenu')
            .slideDown(200);
          $(this)
            .parent()
            .addClass('active');
        }
      });

      $('#close-sidebar').click(() => {
        $('.page-wrapper').removeClass('toggled');
      });
      $('#show-sidebar').click(() => {
        $('.page-wrapper').addClass('toggled');
      });




    });
  }
}
