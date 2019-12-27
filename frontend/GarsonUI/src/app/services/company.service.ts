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
  addATable(body): Observable<any> {
    return this.http.put(BASEURL + '/company/add-a-table', body);
  }
  removeATable(body): Observable<any> {
    return this.http.put(BASEURL + '/company/remove-a-table', body);
  }
  updateCompanyInfo(body): Observable<any> {
    return this.http.put(BASEURL + '/company/company-info-update', body);
  }
  updateFounderInfo(body): Observable<any> {
    return this.http.put(BASEURL + '/company/founder-info-update', body);
  }
  changePassword(body): Observable<any> {
    return this.http.put(BASEURL + '/company/change-password', body);
  }
  AddImage(image): Observable<any> {
    return this.http.post(BASEURL + '/company/upload-image', {
      image
    });

  }
}
