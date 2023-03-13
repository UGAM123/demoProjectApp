import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  @Input() product!:Product;
  @Output() productId = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  callParentDeleteItem(){
    this.productId.emit(this.product.id);
  }

}
