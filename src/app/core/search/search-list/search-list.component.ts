import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Advert, AdvertResponse } from 'src/app/common/model/advert.model';
import { Pagination } from 'src/app/common/model/pagination.model';
import { AdvertService } from 'src/app/common/service/advert.service';

@UntilDestroy()
@Component({
	selector: 'app-search-list',
	templateUrl: './search-list.component.html',
	styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnChanges {

	adverts?: AdvertResponse;
	paginationForm: FormGroup;

	private defaultPageNumber = 0;
	private defaultTotalElements = 10;
	private defaultPageSize = 10;
	private defaultFilter = '';

	levelWord = 'kategórii';

	@Input()
	public query: string | null;

	constructor(
		private route: ActivatedRoute,
		private advertService: AdvertService,
	) {
		this.query = route.snapshot.paramMap.get('query');
		this.paginationForm = new FormGroup({
			pageSize: new FormControl(this.defaultPageSize, [Validators.required])
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.query = this.route.snapshot.paramMap.get('query');
		let pagination: Pagination = { page: this.defaultPageNumber, size: this.defaultPageSize, filter: { query: this.defaultFilter } }
		this.searchAdvertsByQuery(pagination);
	}

	changePage(pageNumber: number): void {
		this.defaultPageNumber = ((pageNumber <= 1) ? 1 : pageNumber) - 1;
		let page: Pagination = {
			page: this.defaultPageNumber,
			size: this.defaultPageSize,
			filter: {
				query: this.defaultFilter
			}
		}
		this.searchAdvertsByQuery(page);
	}

	changePageSize(pageSize: number) {
		this.defaultPageSize = pageSize;
		this.changePage(this.defaultPageNumber);
	}

	getPageSize(): number {
		return this.adverts?.pageable?.pageSize ? this.adverts?.pageable?.pageSize : this.defaultPageSize
	}

	getPageNumber(): number {
		return this.adverts?.pageable?.pageNumber ? this.adverts?.pageable?.pageNumber + 1 : this.defaultPageNumber;
	}

	getTotalElements(): number {
		return this.adverts?.content?.length ? this.adverts?.totalElements : this.defaultTotalElements;
	}

	getNumberOfElements(): number {
		return this.adverts?.content?.length ? this.adverts?.totalElements : 0;
	}


	private searchAdvertsByQuery(pagination?: Pagination): void {
		if (this.query) {
			this.advertService.getAllAdvertsByQuery(this.query, pagination).pipe(untilDestroyed(this)).subscribe((adverts: AdvertResponse) => {
				this.adverts = adverts;
			});
		}
	}
}
