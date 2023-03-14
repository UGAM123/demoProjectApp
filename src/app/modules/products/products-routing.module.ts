import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppResolver } from 'src/app/app.resolver';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path:"products",
    component:ProductsComponent,
    resolve:{product:AppResolver}
  },
  {path:"products/:id/edit",component:ProductsEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
