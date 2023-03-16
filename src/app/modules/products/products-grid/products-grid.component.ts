import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { start } from 'repl';
import { Product } from 'src/app/interfaces/product';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.css']
})
export class ProductsGridComponent implements OnInit {
  @Input() filteredList!:Product[];
  @Input() noProducts!:boolean;
  @Output() addToCart = new EventEmitter();
  quantity:number = 1

  listSlice!:Product[];
  constructor(private service:SharedService, private router:Router) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.listSlice = this.filteredList.slice(0, 12);
  }

  changeQuantity(value:boolean){
    if(!value && this.quantity>0){
      this.quantity--
    }
    else{
      this.quantity++
    }
  }

  callParentAddToCart(product:Product){
    this.addToCart.emit(product)
  }

  onPageChange(event:PageEvent){
    const startIndex = event.pageIndex * 12;
    let endIndex = startIndex + 12;
    if(endIndex > this.filteredList.length){
      endIndex = this.filteredList.length - 1;
    }
    this.listSlice = this.filteredList.slice(startIndex, endIndex)
  }

  isLoggedIn(product:Product){
    if(this.service.getLogInState()){
      this.productInCart(product)  
    }
    else{
      this.router.navigate(['/login'])
    }
  }

  productInCart(product:Product){

  }
}
