import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import io from 'socket.io-client';
declare var jQuery: any;
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  company: any;
  socket: any;
  constructor(private tokenService: TokenService, private router: Router) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.company = this.tokenService.GetPayload();
    // tslint:disable-next-line: no-shadowed-variable
    this.toggleSideNav();
    console.log('resimler :' + this.company.images[0].imgId);
  }


  logOut() {
    this.tokenService.DeleteToken();
    this.router.navigate(['']);
    this.socket.emit('refresh', {});
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
