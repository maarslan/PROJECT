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
    return this.http.post(BASEURL + '/company/create-table', body);
  }
  getTables(): Observable<Table> {
    return this.http.get<Table>(BASEURL + '/company/display-tables');
  }
  updateTableName(body): Observable<any> {
    return this.http.put(BASEURL + '/company/update-table-name/' + body._id, body);
  }

}
