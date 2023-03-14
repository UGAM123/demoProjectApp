import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ProductsAddComponent } from './products-add/products-add.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ProductsGridComponent } from './products-grid/products-grid.component';
import { ProductsComponent } from './products.component';


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsDetailsComponent,
    ProductsAddComponent,
    ProductsEditComponent,
    ProductsComponent,
    ProductsGridComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ],
  exports:[
    ProductsListComponent,
    ProductsDetailsComponent,
    ProductsAddComponent,
    ProductsEditComponent
  ]
})
export class ProductsModule { }
