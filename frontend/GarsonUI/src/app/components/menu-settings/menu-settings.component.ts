import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';

import { Product } from './product.js';
import * as $ from 'jquery';
import io from 'socket.io-client';
import { Router } from '@angular/router';

declare var jQuery: any;
@Component({
  selector: 'app-menu-settings',
  templateUrl: './menu-settings.component.html',
  styleUrls: ['./menu-settings.component.css']
})
export class MenuSettingsComponent implements OnInit {
  isInsert = false;
  productForm: FormGroup;
  products: Product[];
  productUpdateForm: FormGroup;
  chkSelected: Array<any> = [];
  yesToDelete = false;
  confirm = true;
  socket: any;
  selectedName: any;
  selectedDesc: any;
  selectedPrice: any;
  selectedCat: any;
  formUpdate: Array<any> = [];
  constructor(private fb: FormBuilder, private menuService: MenuService, private router: Router) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.init();
    this.getProducts();
    this.socket.on('refreshPage', data => {
      this.getProducts();
    });

  }
  onAddClick() {
    this.isInsert = true;
  }
  onDoneClick() {
    this.isInsert = false;
  }
  init() {

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: ['', Validators.required],
      category: ['', Validators.required]

    });
    this.productUpdateForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      _id: ['', Validators.required]
    });
  }

  submitProduct() {
    this.menuService.addProduct(this.productForm.value).subscribe((data) => {
      console.log(data);

      this.productForm.reset();
      this.socket.emit('refresh', {});
    });
  }

  getProducts() {
    this.menuService.getProducts().subscribe((data) => {
      this.products = data;
      console.log(data);
    });
  }


  UpdateProduct() {
    this.menuService.updateProduct(this.productUpdateForm.value).subscribe((data) => {
      console.log(data);
      this.productUpdateForm.reset();
      this.socket.emit('refresh', {});
      jQuery('#edit').modal('hide');
    });
  }


  selectCheckbox(event, val) {
    if (event.target.checked === true) {
      this.productUpdateForm.get('_id').setValue(val._id);
      this.productUpdateForm.get('name').setValue(val.name);
      this.productUpdateForm.get('description').setValue(val.description);
      this.productUpdateForm.get('price').setValue(val.price);
      this.productUpdateForm.get('category').setValue(val.category);
    }
    //  else {
    //   const index = this.chkSelected.indexOf(val);
    //   this.chkSelected.splice(index, 1);
    // }
    console.log(this.chkSelected);
  }

  intentToDelete() {

    try {
      this.menuService.deleteProduct(this.productUpdateForm.value).subscribe(data => {
        console.log(data);
        this.socket.emit('refresh', {});
        jQuery('#delete').modal('hide');

      });
    } catch (error) {
      console.log(error);
    }
  }

  // sendingValue() {
  //   jQuery('#updateName').val(this.selectedName);
  //   jQuery('#updateDesc').val(this.selectedDesc);
  //   jQuery('#updatePrice').val(this.selectedPrice);
  //   jQuery('#updateCat').val(this.selectedCat);
  //   console.log(this.selectedName);
  // }
















}
