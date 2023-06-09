import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Advert, AdvertResponse } from '../common/model/advert.model';
import { Subcategory } from '../common/model/subcategory.model';
import { Subsubcategory } from '../common/model/subsubcategory.model';
import { AdvertService } from '../common/service/advert.service';
import { SubcategoryService } from '../common/service/subcategory.service';
import { Pagination } from '../common/model/pagination.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@UntilDestroy()
@Component({
	selector: 'app-subcategory',
	templateUrl: './subcategory.component.html',
	styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent {

	subcategoryId: number;
	subcategory?: Subcategory;

	subsubcategories?: Subsubcategory[];
	adverts?: AdvertResponse;

	levelWord = 'podkategórii';
	numberOfAdvertsWordDeclension = '';

	constructor(
		private subcategoryService: SubcategoryService,
		private advertService: AdvertService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.subcategoryId = this.route.snapshot.params['subcategoryId'];
		this.getSubcategoryById();
		this.getSubsubcategoriesBySubcategoryId();

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
		this.getAdvertsBySubcategoryId(page);
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

	getSubcategoryById(): void {
		this.subcategoryService.getSubcategoryById(this.subcategoryId).pipe(untilDestroyed(this)).subscribe((subcategory: Subcategory) => {
			this.subcategory = subcategory;
		}, () => {
			this.router.navigate(['404']);
		});
	}

	getSubsubcategoriesBySubcategoryId(): void {
		this.subcategoryService.getSubsubcategoriesBySubcategoryId(this.subcategoryId).pipe(untilDestroyed(this)).subscribe((subsubcategories: Subsubcategory[]) => {
			this.subsubcategories = subsubcategories;
		});
	}

	getAdvertsBySubcategoryId(pagination?: Pagination): void {
		this.advertService.getAllAdvertsBySubcategoryId(this.subcategoryId, pagination).pipe(untilDestroyed(this)).subscribe((adverts: AdvertResponse) => {
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
