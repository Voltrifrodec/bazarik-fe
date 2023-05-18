import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Advert } from '../common/model/advert.model';
import { Category } from '../common/model/category.model';
import { Subcategory } from '../common/model/subcategory.model';
import { AdvertService } from '../common/service/advert.service';
import { CategoryService } from '../common/service/category.service';

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
	adverts?: Advert[];

	numberOfAdvertsWordDeclension = '';

	constructor(private categoryService: CategoryService, private advertService: AdvertService, private route: ActivatedRoute) {
		this.categoryId = this.route.snapshot.params['categoryId'];
	}
	
	getCategoryById(): void {
		this.categoryService.getCategoryById(this.categoryId).pipe(untilDestroyed(this)).subscribe((category: Category) => {
			this.category = category; 
		});
	}
	
	getSubcategories(): void {
		this.categoryService.getSubcategoriesByCategoryId(this.categoryId).pipe(untilDestroyed(this)).subscribe((subcategories: Subcategory[]) => {
			this.subcategories = subcategories;
		});
	}
	
	getAdverts(): void {
		this.advertService.getAllAdvertsByCategoryId(this.categoryId).pipe(untilDestroyed(this)).subscribe((adverts: Advert[]) => {
			this.adverts = adverts;
			this.getRightWordDeclension();
		})
	}
	
	ngOnInit(): void {
		this.getSubcategories();
		this.getAdverts();
		this.getCategoryById();
	}

	getRightWordDeclension(): void {
		if (! this.category?.numberOfAdverts) {
			this.numberOfAdvertsWordDeclension = 'inzerátov';
			return;
		};

		if (this.category.numberOfAdverts == 1) {
			this.numberOfAdvertsWordDeclension = 'inzerát';
		}

		if (this.category.numberOfAdverts >= 2 && this.category.numberOfAdverts <= 4) {
			this.numberOfAdvertsWordDeclension = 'inzeráty';
		}

		if (this.category.numberOfAdverts >= 5 || this.category.numberOfAdverts <= 0) {
			this.numberOfAdvertsWordDeclension = 'inzerátov';
		}
	}

}
