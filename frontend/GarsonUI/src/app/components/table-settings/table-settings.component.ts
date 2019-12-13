import { Component, OnInit } from '@angular/core';
import { Table } from './table.js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
@Component({
  selector: 'app-table-settings',
  templateUrl: './table-settings.component.html',
  styleUrls: ['./table-settings.component.css']
})
export class TableSettingsComponent implements OnInit {

  tables: Table[];
  tableForm: FormGroup;
  constructor(private fb: FormBuilder, private companyService: CompanyService) { }

  ngOnInit() {
    this.init();
  }


  init() {

    this.tableForm = this.fb.group({
      counter: ['', Validators.required]

    });
    this.displayTables();
  }
  displayTables() {
    this.companyService.getTables().subscribe(data => {
      this.tables = data;
    });
  }


  submitTableNumber() {
    this.companyService.addTable(this.tableForm.value).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
}
