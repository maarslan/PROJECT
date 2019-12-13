import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Table } from '../components/table-settings/table.js';
const BASEURL = 'http://localhost:3000/api/garsonn';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  addTable(body): Observable<any> {
    return this.http.post(BASEURL + '/menu/create-table', body);
  }
  getTables(): Observable<Table> {
    return this.http.get<Table>(BASEURL + '/menu/display-tables');
  }

}
