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
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'adverts/new',
		component: AdvertFormComponent
	},
	{
		path: 'adverts/:advertId',
		component: AdvertDetailPageComponent
	},
	{
		path: 'search',
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
		redirectTo: '',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
