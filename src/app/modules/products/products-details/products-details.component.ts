import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { SharedService } from 'src/app/shared/shared.service';
import { CartService } from '../../cart/cart.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  @Input() product!: Product;
  @Output() productId = new EventEmitter();
  product_id!: number
  productsList!: Product[]
  routeProduct!: Product

  constructor(private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private cartService: CartService,
    private productService:ProductsService,
    private service: SharedService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      if (res['id']) {
        this.product_id = res['id']
        const products = localStorage.getItem('productsList')
        if (products != null) {
          this.productsList = JSON.parse(products)
          this.productsList.forEach(prod => {
            if (prod.id == this.product_id) {
              this.routeProduct = prod
            }
          })
        }
      }
    })
  }

  changeQuantity(product:Product ,value:boolean){
    if(!value && product.quantity>1){
     product.quantity--
    }
    else if(value){
     product.quantity++
    }
  }
  callParentDeleteItem(product:Product) {
    if(this.cartService.productInCart(product)){
      this._snackBar.open("Cannot delete products in cart.", '', {
        duration: 3000
      });
    }
    else{
      this.productId.emit(product.id);
    }
  }

  productInCart(product: Product) {
    return this.cartService.productInCart(product)
  }

  isLoggedIn(product: Product) {
    if (this.service.getLogInState()) {
      console.warn("hii")
      this.cartService.addProductToCart(product)
    }
    else {
      console.log("hii")
      this.router.navigate(['/login'])
    }
  }
  addToCart(product: Product) {
  }

  deleteProduct(product:Product){
    if(this.cartService.productInCart(product)){
      this._snackBar.open("Cannot delete products in cart.", '', {
        duration: 3000
      });
    }
    else{
      this.productService.deleteProduct(product.id)
      this.router.navigate(['/products'])
    }
  }
}
