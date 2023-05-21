import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Advert, AdvertResponse } from '../common/model/advert.model';
import { Category } from '../common/model/category.model';
import { Pagination } from '../common/model/pagination.model';
import { Subcategory } from '../common/model/subcategory.model';
import { AdvertService } from '../common/service/advert.service';
import { CategoryService } from '../common/service/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@UntilDestroy()
@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
	categoryId: number;
	category?: Category;

	subcategories?: Subcategory[];

	adverts?: AdvertResponse;

	levelWord = 'kategórii';

	constructor(
		private categoryService: CategoryService,
		private advertService: AdvertService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.categoryId = this.route.snapshot.params['categoryId'];
		this.getSubcategories();
		this.getCategoryById();

		this.paginationForm = new FormGroup({
			pageSize: new FormControl(this.defaultPageSize, [Validators.required])
		})
	}

	paginationForm: FormGroup;

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
		this.getAdvertsByCategoryId(page);
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

	getCategoryById(): void {
		this.categoryService.getCategoryById(this.categoryId).pipe(untilDestroyed(this)).subscribe((category: Category) => {
			this.category = category;
		}, () => {
			this.router.navigate(['404']);
		});
	}

	getSubcategories(): void {
		this.categoryService.getSubcategoriesByCategoryId(this.categoryId).pipe(untilDestroyed(this)).subscribe((subcategories: Subcategory[]) => {
			this.subcategories = subcategories;
		});
	}

	getAdvertsByCategoryId(pagination?: Pagination): void {
		this.advertService.getAllAdvertsByCategoryId(this.categoryId, pagination).pipe(untilDestroyed(this)).subscribe((adverts: AdvertResponse) => {
			this.adverts = adverts;
		})
	}

}
