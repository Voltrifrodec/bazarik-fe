import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdvertComponent } from './advert/advert.component';
import { AdvertFormComponent } from './advert/advert-form/advert-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdvertDetailPageComponent } from './advert/advert-detail-page/advert-detail-page.component';

@NgModule({
	declarations: [
		AppComponent,
		AdvertComponent,
		AdvertFormComponent,
  		AdvertDetailPageComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		FontAwesomeModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
