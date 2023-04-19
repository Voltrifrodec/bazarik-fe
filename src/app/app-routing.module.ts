import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertComponent } from './advert/advert.component';
import { AdvertFormComponent } from './advert/advert-form/advert-form.component';
import { AdvertDetailPageComponent } from './advert/advert-detail-page/advert-detail-page.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './core/home/home.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { SubsubcategoryComponent } from './subsubcategory/subsubcategory.component';
import { SearchComponent } from './core/search/search.component';
import { PagenotfoundComponent } from './errors/pagenotfound/pagenotfound.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'advert/new',
		component: AdvertFormComponent
	},
	{
		path: 'advert/:advertId',
		component: AdvertDetailPageComponent
	},
	{
		path: 'advert/edit/:advertId',
		component: AdvertFormComponent
	},
	{
		path: 'search/:query',
		component: SearchComponent
	},
	{
		path: 'categories',
		pathMatch: 'full',
		component: CategoriesComponent
	},
	{
		path: 'categories/:categoryId',
		pathMatch: 'full',
		component: CategoriesComponent
	},
	{
		path: 'subcategories',
		pathMatch: 'full',
		component: SubcategoryComponent
	},
	{
		path: 'subcategories/:subcategoryId',
		pathMatch: 'full',
		component: SubcategoryComponent
	},
	{
		path: 'subsubcategories/:subsubcategoryId',
		pathMatch: 'full',
		component: SubsubcategoryComponent
	},
	{
		path: 'subsubcategories',
		pathMatch: 'full',
		component: SubsubcategoryComponent
	},
	{
		path: '404',
		component: PagenotfoundComponent
	},
	{
		path: '**',
		redirectTo: '404',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
