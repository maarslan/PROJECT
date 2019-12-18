import { Component, OnInit } from '@angular/core';
import { Table } from './table.js';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
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
  tableNumber;
  tableForm: FormGroup;
  selectedTableName: Array<any> = [];
  updateTableNameForm: FormGroup;
  selectedTableNo: any;
  updateTableNumForm: FormGroup;
  NewTableNumber;

  constructor(private fb: FormBuilder, private companyService: CompanyService) {
    this.socket = io('http://localhost:3000');

  }

  ngOnInit() {
    this.init();
    this.socket.on('refreshPage', data => {
      this.displayTables();
    });
    // for the switching the  form fields inside create table form and add/remove table fields
    this.formsVisibility();
  }


  init() {
    // for the form to get number of table from user
    this.tableForm = this.fb.group({
      counter: ['', Validators.required]
    });
    // for the form to update the name and no fields of a table
    this.updateTableNameForm = this.fb.group({
      name: ['', Validators.required],
      _id: ['', Validators.required],
      no: ['', Validators.required]
    });

    this.displayTables();
  }
  // display the tables in the table
  displayTables() {
    this.companyService.getTables().subscribe(data => {
      this.tables = data;
      this.tableNumber = data.length;
      jQuery('#totalTableNumber').text(this.tableNumber);
      console.log('MASA SAYISI :' + this.tableNumber);


      console.log('Toplam Masa Sayısı :' + this.tableNumber);


    });
  }

  // If the table array is empty then the create tables as much as input number
  submitTableNumber() {
    this.companyService.addTable(this.tableForm.value).subscribe(data => {
      console.log(data);
      this.tableForm.reset();
      this.socket.emit('refresh', {});
    }, err => {
      console.log(err);
    });
  }
  // Get html field for the value from checked object in table and set it as value
  // Used it instead of ngModel
  selectedTable(event, val) {
    if (event.target.checked === true) {
      this.updateTableNameForm.get('name').setValue(val.name);
      this.updateTableNameForm.get('_id').setValue(val._id);
      this.selectedTableNo = this.updateTableNameForm.get('no').setValue(val.no);
    }
    console.log(this.selectedTableName);
    console.log(this.selectedTableNo);
  }

  // The checked object value is sending to update field
  sendingValue() {
    jQuery('#updateNo').text(this.selectedTableNo);

    console.log(this.selectedTableNo);
  }
  // Edit Field Form
  UpdateTableName() {
    this.companyService.updateTableName(this.updateTableNameForm.value).subscribe(data => {
      console.log(data);
      this.updateTableNameForm.reset();
      this.socket.emit('refresh', {});
      jQuery('#edit').modal('hide');
    });
  }

  // +/- Field Form
  addTable() {
    return this.companyService.addATable(this.tables).subscribe(data => {
      console.log(data);
      this.socket.emit('refresh', {});
    });

  }
  removeTable() {
    return this.companyService.removeATable(this.tableForm.value).subscribe(data => {
      console.log(data);
      this.socket.emit('refresh', {});
    });
  }

  formsVisibility() {
    if ($('#totalTableNumber').html('0')) {
      $('#CreateTables').hide();
      $('#UpdateTables').show();
      $('#EmptyTable').hide();

    } else {
      $('#CreateTables').show();
      $('#UpdateTables').hide();
      $('#totalTableNumber').text('0');
    }
  }

}
