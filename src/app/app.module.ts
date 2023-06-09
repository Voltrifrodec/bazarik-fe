import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './main/main.component';
import { CategoriesComponent } from './categories/categories.component';
import { AdvertComponent } from './advert/advert.component';
import { AdvertFormComponent } from './advert/advert-form/advert-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdvertDetailPageComponent } from './advert/advert-detail-page/advert-detail-page.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { SubsubcategoryComponent } from './subsubcategory/subsubcategory.component';
import { SearchComponent } from './core/search/search.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PagenotfoundComponent } from './errors/pagenotfound/pagenotfound.component';
import { RecentAdvertListComponent } from './advert/recent-advert-list/recent-advert-list.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategorySectionListComponent } from './categories/category-section-list/category-section-list.component';
import { CategoryAdvertListComponent } from './categories/category-advert-list/category-advert-list.component';
import { SubcategorySectionListComponent } from './subcategory/subcategory-section-list/subcategory-section-list.component';
import { SubcategoryAdvertListComponent } from './subcategory/subcategory-advert-list/subcategory-advert-list.component';
import { SubsubcategoryAdvertListComponent } from './subsubcategory/subsubcategory-advert-list/subsubcategory-advert-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdvertTileComponent } from './advert/advert-tile/advert-tile.component';
import { ErrorsComponent } from './errors/errors.component';
import { SearchListComponent } from './core/search/search-list/search-list.component';
import { EmptyAdvertListComponent } from './advert/empty-advert-list/empty-advert-list.component';
import { FooterComponent } from './footer/footer.component';
import { SecurityComponent } from './security/security.component';
import { SecurityFormComponent } from './security/security-form/security-form.component';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { CategoryTileComponent } from './categories/category-tile/category-tile.component';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import { AuthHeaderInterceptor } from './authentication/interceptor/auth-header.interceptor';
import { AdminComponent } from './admin/admin.component';
import { AdvertNumberComponent } from './advert/advert-number/advert-number.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminTableComponent } from './admin/admin-table/admin-table.component';
import { PageSizeFormComponent } from './pagination/page-size-form/page-size-form.component';

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
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
		ErrorsComponent,
		SearchListComponent,
		EmptyAdvertListComponent,
		FooterComponent,
		SecurityComponent,
		SecurityFormComponent,
		CategoryTileComponent,
        LoginPageComponent,
        AdminComponent,
        AdvertNumberComponent,
        AdminTableComponent,
        PageSizeFormComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		FontAwesomeModule,
		ReactiveFormsModule,
		HttpClientModule,
		AngularToastifyModule,
		NgxPaginationModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthHeaderInterceptor,
			multi: true
		},
		ToastService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
