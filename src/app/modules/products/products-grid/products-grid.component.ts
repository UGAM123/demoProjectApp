import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.css']
})
export class ProductsGridComponent implements OnInit {
  @Input() filteredList!:Product[];
  @Input() noProducts!:boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
