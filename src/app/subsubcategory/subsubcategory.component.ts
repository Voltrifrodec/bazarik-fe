import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Advert, AdvertResponse } from '../common/model/advert.model';
import { Subsubcategory } from '../common/model/subsubcategory.model';
import { AdvertService } from '../common/service/advert.service';
import { SubsubcategoryService } from '../common/service/subsubcategory.service';
import { Pagination } from '../common/model/pagination.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@UntilDestroy()
@Component({
	selector: 'app-subsubcategory',
	templateUrl: './subsubcategory.component.html',
	styleUrls: ['./subsubcategory.component.css']
})
export class SubsubcategoryComponent {

	subsubcategoryId: number;
	subsubcategory?: Subsubcategory;

	adverts?: AdvertResponse;

	numberOfAdvertsWordDeclension = '';
	levelWord = 'podpodkategórii';

	constructor(
		private subsubcategoryService: SubsubcategoryService,
		private advertService: AdvertService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.subsubcategoryId = this.route.snapshot.params['subsubcategoryId'];
		this.getSubsubcategoryById();

		this.paginationForm = new FormGroup({
			pageSize: new FormControl(this.defaultPageSize, [Validators.required])
		})
	}

	paginationForm: FormGroup;

	@Output()
	pageChange = new EventEmitter<Pagination>();

	private defaultPageNumber = 0;
	private defaultTotalElements = 10;
	private defaultPageSize = 10;
	private defaultFilter = '';

	changePage(pageNumber: number): void {
		this.defaultPageNumber = ((pageNumber <= 1) ? 1 : pageNumber) - 1;
		let page: Pagination = {
			page: this.defaultPageNumber,
			size: this.defaultPageSize,
			filter: {
				query: this.defaultFilter
			}
		}

		this.getAdvertsBySubsubcategoryId(page);
	}

	changePageSize(pageSize: number) {
		this.defaultPageSize = pageSize;
		this.changePage(this.defaultPageNumber);
	}

	setPageSize(): void {
		this.defaultPageSize = this.paginationForm.controls['pageSize'].value;
		if (this.adverts) {
			this.adverts.pageable.pageSize = this.defaultPageSize;
		}
		this.changePage(this.getPageNumber());
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

	getSubsubcategoryById(): void {
		this.subsubcategoryService.getSubsubcategoryById(this.subsubcategoryId).pipe(untilDestroyed(this)).subscribe((subsubcategory: Subsubcategory) => {
			this.subsubcategory = subsubcategory;
		}, () => {
			this.router.navigate(['404']);
		});
	}

	getAdvertsBySubsubcategoryId(pagination?: Pagination): void {
		this.advertService.getAllAdvertsBySubsubcategoryId(this.subsubcategoryId, pagination).pipe(untilDestroyed(this)).subscribe((adverts: AdvertResponse) => {
			this.adverts = adverts;
			this.getRightWordDeclension();
		});
	}

	getRightWordDeclension(): void {
		if (!this.adverts?.content.length) {
			this.numberOfAdvertsWordDeclension = 'inzerátov';
			return;
		};

		if (this.adverts?.content.length == 1) {
			this.numberOfAdvertsWordDeclension = 'inzerát';
		}

		if (this.adverts?.content.length >= 2 && this.adverts?.content.length <= 4) {
			this.numberOfAdvertsWordDeclension = 'inzeráty';
		}

		if (this.adverts?.content.length >= 5 || this.adverts?.content.length <= 0) {
			this.numberOfAdvertsWordDeclension = 'inzerátov';
		}
	}

}
