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

	constructor(private subcategoryService: SubcategoryService, private advertService: AdvertService, private route: ActivatedRoute) {
		this.subcategoryId = this.route.snapshot.params['subcategoryId'];
		this.subcategoryService.getSubcategoryById(this.subcategoryId).pipe(untilDestroyed(this)).subscribe((subcategory: Subcategory) => {
			this.subcategory = subcategory;
		});
		// console.log('This subcategory has ID:', this.subcategoryId);
	}


	getSubsubcategories(): void {
		this.subcategoryService.getSubsubcategoriesBySubcategoryId(this.subcategoryId).pipe(untilDestroyed(this)).subscribe((subsubcategories: Subsubcategory[]) => {
			this.subsubcategories = subsubcategories;
			// console.log('Received subsubcategories:', this.subsubcategories);
		});
	}

	getAdverts(): void {
		// console.log('Posielam ID subcategory:', this.subcategoryId);
		this.advertService.getAllAdvertsBySubcategoryId(this.subcategoryId).pipe(untilDestroyed(this)).subscribe((adverts: Advert[]) => {
			this.adverts = adverts;
			// console.log('Received adverts for the subcategory:', this.adverts);
		});
	}

	ngOnInit(): void {
		this.getSubsubcategories();
		this.getAdverts();
		this.subcategoryService.getSubcategoryById(this.subcategoryId).pipe(untilDestroyed(this)).subscribe((subcategory: Subcategory) => {
			this.subcategory = subcategory;
		});
	}


}
