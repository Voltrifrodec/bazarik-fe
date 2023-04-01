import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertComponent } from './advert/advert.component';
import { AdvertFormComponent } from './advert/advert-form/advert-form.component';
import { AdvertDetailPageComponent } from './advert/advert-detail-page/advert-detail-page.component';

const routes: Routes = [
	{
		path: 'advert',
		component: AdvertFormComponent
	},
	{
		path: 'advert/:advertId',
		component: AdvertDetailPageComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
