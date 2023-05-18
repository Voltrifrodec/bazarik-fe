import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { faLocationArrow, faExclamationCircle, faCheckCircle, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Advert, AdvertResponse } from 'src/app/common/model/advert.model';
import { Pagination } from 'src/app/common/model/pagination.model';

@Component({
	selector: 'app-category-advert-list',
	templateUrl: './category-advert-list.component.html',
	styleUrls: ['./category-advert-list.component.css']
})
export class CategoryAdvertListComponent implements OnInit, OnChanges {

	faLocationArrow = faLocationArrow;
	faExclamationCircle = faExclamationCircle;
	faCheckCircle = faCheckCircle;
	faPencilAlt = faPencilAlt;
	faTrash = faTrash;

	@Input()
	adverts?: AdvertResponse;

	ngOnChanges(changes: SimpleChanges): void {
		console.log(this.adverts);
	}

	ngOnInit(): void {
		let date = new Date().toUTCString();
		console.log(date, 'Amount of received adverts at advert-list:', this.adverts);
	}

}
