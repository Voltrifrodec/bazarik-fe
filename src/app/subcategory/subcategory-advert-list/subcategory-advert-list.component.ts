import { Component, Input } from '@angular/core';
import { faLocationArrow, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Advert, AdvertResponse } from 'src/app/common/model/advert.model';

@Component({
	selector: 'app-subcategory-advert-list',
	templateUrl: './subcategory-advert-list.component.html',
	styleUrls: ['./subcategory-advert-list.component.css']
})
export class SubcategoryAdvertListComponent {
	faLocationArrow = faLocationArrow;
	faExclamationCircle = faExclamationCircle;
	faCheckCircle = faCheckCircle;

	@Input()
	adverts?: AdvertResponse;
}
