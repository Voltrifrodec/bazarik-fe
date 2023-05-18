import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Advert } from '../common/model/advert.model';
import { Subcategory } from '../common/model/subcategory.model';
import { Subsubcategory } from '../common/model/subsubcategory.model';
import { AdvertService } from '../common/service/advert.service';
import { SubcategoryService } from '../common/service/subcategory.service';


@UntilDestroy()
@Component({
	selector: 'app-subcategory',
	templateUrl: './subcategory.component.html',
	styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

	subcategoryId: number;
	subcategory?: Subcategory;

	subsubcategories?: Subsubcategory[];
	adverts?: Advert[];

	levelWord = 'podkategórii';

	numberOfAdvertsWordDeclension = '';

	constructor(private subcategoryService: SubcategoryService, private advertService: AdvertService, private route: ActivatedRoute) {
		this.subcategoryId = this.route.snapshot.params['subcategoryId'];
		this.getSubcategoryById();
		
	}

	getSubcategoryById(): void {
		this.subcategoryService.getSubcategoryById(this.subcategoryId).pipe(untilDestroyed(this)).subscribe((subcategory: Subcategory) => {
			this.subcategory = subcategory;
		});
	}

	getSubsubcategories(): void {
		this.subcategoryService.getSubsubcategoriesBySubcategoryId(this.subcategoryId).pipe(untilDestroyed(this)).subscribe((subsubcategories: Subsubcategory[]) => {
			this.subsubcategories = subsubcategories;
		});
	}

	getAdverts(): void {
		this.advertService.getAllAdvertsBySubcategoryId(this.subcategoryId).pipe(untilDestroyed(this)).subscribe((adverts: Advert[]) => {
			this.adverts = adverts;
			this.getRightWordDeclension();
		});
	}

	ngOnInit(): void {
		this.getSubsubcategories();
		this.getAdverts();
		this.getSubcategoryById();
	}

	getRightWordDeclension(): void {
		if (! this.adverts?.length) {
			this.numberOfAdvertsWordDeclension = 'inzerátov';
			return;
		};

		if (this.adverts?.length == 1) {
			this.numberOfAdvertsWordDeclension = 'inzerát';
		}

		if (this.adverts?.length >= 2 && this.adverts?.length <= 4) {
			this.numberOfAdvertsWordDeclension = 'inzeráty';
		}

		if (this.adverts?.length >= 5 || this.adverts?.length <= 0) {
			this.numberOfAdvertsWordDeclension = 'inzerátov';
		}
	}

}
