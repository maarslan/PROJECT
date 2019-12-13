import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';
import { Category } from './category.js';
import { Product } from './product.js';
import { $, promise } from 'protractor';
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
  constructor(private fb: FormBuilder, private menuService: MenuService) { }

  ngOnInit() {
    this.init();
    this.getProducts();


  }
  onAddClick() {
    this.isInsert = true;
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
      this.getProducts();
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
      this.getProducts();

    });
  }


  selectCheckbox(event, val) {
    if (event.target.checked === true) {
      this.chkSelected = val;
    }
    //  else {
    //   const index = this.chkSelected.indexOf(val);
    //   this.chkSelected.splice(index, 1);
    // }
    console.log(this.chkSelected);
  }

  intentToDelete() {
    this.confirm = true;
  }

  deleteAProduct(product) {

    if (this.confirm === true) {
      try {
        this.menuService.deleteProduct(product).subscribe(data => {
          console.log(data);
        });
      } catch (error) {
        console.log(error + product._id);
      }
    }
  }






}

