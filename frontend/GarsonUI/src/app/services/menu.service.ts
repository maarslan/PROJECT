import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../components/menu-settings/product.js';


const BASEURL = 'http://localhost:3000/api/garsonn';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }
  //  addCategory(body): Observable<any> {
  //    return this.http.post(BASEURL + '/menu/add-category', body);
  //  }
  addProduct(body): Observable<any> {
    return this.http.post(BASEURL + '/menu/add-product', body);

  }
  getCategories(): Observable<Product> {
    return this.http.get<Product>(BASEURL + '/menu/list-categories');
  }
  getProducts(): Observable<Product> {
    return this.http.get<Product>(BASEURL + '/menu/list-products');
  }
  updateProduct(body): Observable<any> {
    return this.http.put(BASEURL + '/menu/update-product', body);
  }
}
