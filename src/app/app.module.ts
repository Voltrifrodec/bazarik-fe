import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './core/home/home.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
	declarations: [
		AppComponent,
  HomeComponent,
  CategoriesComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
  NgbModule,
  FontAwesomeModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
