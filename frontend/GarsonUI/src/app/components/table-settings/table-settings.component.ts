import { Component, OnInit } from '@angular/core';
import { Table } from './table.js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import io from 'socket.io-client';
import * as $ from 'jquery';
import { DirectiveResolver } from '@angular/compiler';

declare var jQuery: any;
@Component({
  selector: 'app-table-settings',
  templateUrl: './table-settings.component.html',
  styleUrls: ['./table-settings.component.css']
})
export class TableSettingsComponent implements OnInit {
  socket: any;
  tables: Table[];
  tableForm: FormGroup;
  selectedTableName: Array<any> = [];
  updateTableNameForm: FormGroup;
  selectedTableNo: any;

  constructor(private fb: FormBuilder, private companyService: CompanyService) {
    this.socket = io('http://localhost:3000');

  }

  ngOnInit() {
    this.init();
    this.socket.on('refreshPage', data => {
      this.displayTables();
    });
  }


  init() {
    this.displayTables();

    this.tableForm = this.fb.group({
      counter: ['', Validators.required],
    });
    this.updateTableNameForm = this.fb.group({
      name: ['', Validators.required],
      _id: ['', Validators.required],
      no: ['', Validators.required]
    });
    this.displayTables();
  }

  displayTables() {
    this.companyService.getTables().subscribe(data => {
      this.tables = data;
      console.log(data);
    });
  }


  submitTableNumber() {
    this.companyService.addTable(this.tableForm.value).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
  selectedTable(event, val) {
    if (event.target.checked === true) {
      this.selectedTableName = val._id;
      this.selectedTableNo = val.no;

    }


    console.log(this.selectedTableName);
    console.log(this.selectedTableNo);
  }
  UpdateTableName() {
    this.companyService.updateTableName(this.updateTableNameForm.value).subscribe(data => {
      console.log(data);
      this.updateTableNameForm.reset();
      this.socket.emit('refresh', {});
      jQuery('#edit').modal('hide');
    });
  }

  sendingValue() {
    jQuery('#updateNo').val(this.selectedTableNo);

    console.log(this.selectedTableNo);
  }

}
