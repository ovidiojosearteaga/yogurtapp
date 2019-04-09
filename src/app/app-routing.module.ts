import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { 
    path: 'welcome', 
    loadChildren: './welcome/welcome.module#WelcomePageModule' 
  },
  { 
    path: 'main', 
    loadChildren: './main/main.module#MainPageModule' 
  },
  { 
    path: 'productlist', 
    loadChildren: './productlist/productlist.module#ProductlistPageModule' 
  },
  { 
    path: 'product/:id', 
    loadChildren: './product/product.module#ProductPageModule' 
  },
  { 
    path: 'createorder', 
    loadChildren: './createorder/createorder.module#CreateorderPageModule' 
  },
  { 
    path: 'customerlist', 
    loadChildren: './customerlist/customerlist.module#CustomerlistPageModule' 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
