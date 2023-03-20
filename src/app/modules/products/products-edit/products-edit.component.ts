import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  productForm!: FormGroup
  productsList!: Product[]
  product!: Product
  id!: any
  is_edit: boolean = false
  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => { this.id = res['id'] })
    const records = localStorage.getItem('productsList')
    if (records !== null) {
      this.productsList = JSON.parse(records)
      if (this.id !== "0") {
        this.is_edit = true
        this.productsList.filter(prod => {
          if (prod.id == this.id) { this.product = prod }
        })
      }
    }
    this.productForm = new FormGroup({
      'title': new FormControl((this.product == null) ? null : this.product.title, Validators.required),
      'brand': new FormControl((this.product == null) ? null : this.product.brand, Validators.required),
      'category': new FormControl((this.product == null) ? null : this.product.category, Validators.required),
      'description': new FormControl((this.product == null) ? null : this.product.description, Validators.required),
      'price': new FormControl((this.product == null) ? null : this.product.price, Validators.required),
      'discountPercentage': new FormControl((this.product == null) ? null : this.product.discountPercentage, Validators.required),
      'stock': new FormControl((this.product == null) ? null : this.product.stock, Validators.required),
      'rating': new FormControl((this.product == null) ? null : this.product.rating, Validators.required),
      'thumbnail': new FormControl((this.product == null) ? null : this.product.thumbnail, Validators.required),
    })
  }

  onSubmit() {
    debugger
    if (this.product == null) {
      this.product = this.productService.getEmptyProduct()
    }
    this.product.title = this.productForm.get('title')?.value
    this.product.brand = this.productForm.get('brand')?.value
    this.product.category = this.productForm.get('category')?.value
    this.product.description = this.productForm.get('description')?.value
    this.product.price = this.productForm.get('price')?.value
    this.product.discountPercentage = this.productForm.get('discountPercentage')?.value
    this.product.stock = this.productForm.get('stock')?.value
    this.product.rating = this.productForm.get('rating')?.value
    this.product.thumbnail = this.productForm.get('thumbnail')?.value

    if (this.is_edit) {
      this.productsList.splice(this.productsList.findIndex(i => i.id == this.product.id), 1)
      this.productsList.splice(this.productsList.findIndex(i => i.id == this.product.id), 0, this.product)
    }
    else {
      this.product.id = this.productsList.length + 1
      this.productsList.push(this.product)
    }

    localStorage.setItem('productsList', JSON.stringify(this.productsList))
    this.router.navigate(['/products/details/' + this.product.id])
  }

}
