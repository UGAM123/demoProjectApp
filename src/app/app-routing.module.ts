import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppResolver } from './app.resolver';
import { ErrorComponent } from './modules/error/error.component';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    resolve:{products : AppResolver}
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  // { path: "**",component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
