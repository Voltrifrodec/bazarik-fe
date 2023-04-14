import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './core/home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { AdvertComponent } from './advert/advert.component';
import { AdvertFormComponent } from './advert/advert-form/advert-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdvertDetailPageComponent } from './advert/advert-detail-page/advert-detail-page.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { SubsubcategoryComponent } from './subsubcategory/subsubcategory.component';
import { SearchComponent } from './core/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RecentAdvertListComponent } from './core/home/recent-advert-list/recent-advert-list.component';
import { CategoryListComponent } from './core/home/category-list/category-list.component';
import { CategorySectionListComponent } from './categories/category-section-list/category-section-list.component';
import { CategoryAdvertListComponent } from './categories/category-advert-list/category-advert-list.component';
import { SubcategorySectionListComponent } from './subcategory/subcategory-section-list/subcategory-section-list.component';
import { SubcategoryAdvertListComponent } from './subcategory/subcategory-advert-list/subcategory-advert-list.component';
import { SubsubcategoryAdvertListComponent } from './subsubcategory/subsubcategory-advert-list/subsubcategory-advert-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdvertTileComponent } from './advert/advert-tile/advert-tile.component';
import { ErrorsComponent } from './errors/errors.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		CategoriesComponent,
		AdvertComponent,
		AdvertFormComponent,
  		AdvertDetailPageComponent,
		SubcategoryComponent,
		SubsubcategoryComponent,
		SearchComponent,
  		PagenotfoundComponent,
		CategoryListComponent,
		RecentAdvertListComponent,
		CategorySectionListComponent,
		CategoryAdvertListComponent,
		SubcategorySectionListComponent,
		SubcategoryAdvertListComponent,
  		SubsubcategoryAdvertListComponent,
    NavbarComponent,
    AdvertTileComponent,
    ErrorsComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		FontAwesomeModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
