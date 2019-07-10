import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: '',
		component: TabsPage,
		children: [
			{
				path: 'main',
				children: [
					{
						path: '',
						loadChildren: '../main/main.module#MainPageModule'
					}
				]
			},
			{
				path: 'products',
				children: [
					{
						path: '',
						loadChildren: '../productlist/productlist.module#ProductlistPageModule'
					}
				]
			},
			{
				path: 'createorder',
				children: [
					{
						path: '',
						loadChildren: '../createorder/createorder.module#CreateorderPageModule'
					}
				]
			},
			{
				path: 'customerlist',
				children: [
					{
						path: '',
						loadChildren: '../customerlist/customerlist.module#CustomerlistPageModule'
					}
				]
			},
			{
				path: '',
				redirectTo: '/tabs/main',
				pathMatch: 'full'
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})

export class TabsPageRoutingModule {}