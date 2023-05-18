import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

	levelWord = 'kategórii';

	numberOfAdvertsWordDeclension = '';

	constructor(
		private categoryService: CategoryService,
		private advertService: AdvertService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.categoryId = this.route.snapshot.params['categoryId'];
		this.getSubcategories();
		this.getCategoryById();
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
	
	getAdverts(): void {
		this.advertService.getAllAdvertsByCategoryId(this.categoryId).pipe(untilDestroyed(this)).subscribe((adverts: Advert[]) => {
			this.adverts = adverts;
		})
	}
	
	ngOnInit(): void {
		this.getAdverts();
	}

}
