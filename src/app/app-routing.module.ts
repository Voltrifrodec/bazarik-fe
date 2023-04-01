import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertComponent } from './advert/advert.component';
import { AdvertFormComponent } from './advert/advert-form/advert-form.component';
import { AdvertDetailPageComponent } from './advert/advert-detail-page/advert-detail-page.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
	{
		path: 'advert',
		component: AdvertFormComponent
	},
	{
		path: 'advert/:advertId',
		component: AdvertDetailPageComponent
	},
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'categories',
		pathMatch: 'full',
		component: CategoriesComponent
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full',
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
