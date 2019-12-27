import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import io from 'socket.io-client';
import * as $ from 'jquery';
import { FileUploadModule, FileUploader } from 'ng2-file-upload';

declare var jQuery: any;

const URL = 'http://localhost:3000/api/garsonn/company/upload-image';
@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {
  company: any;
  socket: any;
  companyInfoForm: FormGroup;
  founderInfoForm: FormGroup;
  founder: any;
  selectedFile: any;

  uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true
  });

  onFileSelected(event) {
    const file: File = event[0];
    this.ReadAsBase64(file).then(result => {
      this.selectedFile = result;
    }).catch(err => {
      console.log(err)
    });
  }
  ReadAsBase64(file): Promise<any> {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });
      reader.addEventListener('error', (event) => {
        reject(event);
      });
      reader.readAsDataURL(file);
    });
    return fileValue;
  }
  Upload() {
    if (this.selectedFile) {
      this.companyService.AddImage(this.selectedFile).subscribe(data => {
        console.log(data);
        // const filePath = $('#filePath');
        // filePath.value = '';
      }, err => console.log(err));
    }
  }
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder,
    private companyService: CompanyService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.init();
    this.company = this.tokenService.GetPayload();
    this.founder = this.company.founder;
    console.log(this.company);
    console.log(this.founder);
  }
  init() {
    this.companyInfoForm = this.fb.group({
      companyName: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      TaxImageUrl: ['', Validators.required],
      LogoUrl: ['', Validators.required]

    });

    this.founderInfoForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      citizenNumber: ['', Validators.required],
      taxNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }
  ExactTime(time) {
    moment.locale('tr');
    return moment(time).format('MMMM Do YYYY, h:mm:ss a');
  }
  BirthTime(time) {
    moment.locale('tr');
    return moment(time).format('MMM Do YYYY');
  }
  companyInfoUpdate() {

    this.companyService.updateCompanyInfo(this.companyInfoForm.value).subscribe((data) => {
      console.log(data);
      this.companyInfoForm.reset();
      this.socket.emit('refresh', {});
      jQuery('#update').modal('hide');

    });

  }

  founderInfoUpdate() {

    this.companyService.updateFounderInfo(this.founderInfoForm.value).subscribe((data) => {
      console.log(data);
      this.companyInfoForm.reset();
      this.socket.emit('refresh', {});
      jQuery('#updateFounder').modal('hide');

    });

  }



}
