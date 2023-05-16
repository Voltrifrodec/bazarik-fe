import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Category } from 'src/app/common/model/category.model';
import { AdvertService } from 'src/app/common/service/advert.service';

import { faBox } from '@fortawesome/free-solid-svg-icons';

@UntilDestroy()
@Component({
	selector: 'app-category-tile',
	templateUrl: './category-tile.component.html',
	styleUrls: ['./category-tile.component.css']
})
export class CategoryTileComponent implements OnInit {

	faBox = faBox;

	@Input()
	category?: Category;

	numberOfAdvertsInCategory: number = 0;
	numberOfAdvertsWordDeclension: string = '';
	counter = 0;

	constructor(
		private advertService: AdvertService
	) { }

	ngOnInit(): void {
		this.getNumberOfAdvertsInCategoryByCategoryId();
	}

	count(): void {
		if (this.counter < this.numberOfAdvertsInCategory) {
			this.counter++;
			setTimeout(() => {
				this.count();
			}, 2 / this.numberOfAdvertsInCategory ** 4);
		}
	}

	getRightWordDeclension(): void {
		if (this.numberOfAdvertsInCategory == 1) {
			this.numberOfAdvertsWordDeclension = 'inzerát';
		}

		if (this.numberOfAdvertsInCategory >= 2 && this.numberOfAdvertsInCategory <= 4) {
			this.numberOfAdvertsWordDeclension = 'inzeráty';
		}

		if (this.numberOfAdvertsInCategory >= 5 || this.numberOfAdvertsInCategory <= 0) {
			this.numberOfAdvertsWordDeclension = 'inzerátov';
		}
	}

	getNumberOfAdvertsInCategoryByCategoryId(): void {
		if (!this.category) return;

		this.advertService.getNumberOfAdvertsInCategoryByCategoryId(this.category.id).pipe(untilDestroyed(this)).subscribe((numberOfAdvertsInCategory: number) => {
			this.numberOfAdvertsInCategory = numberOfAdvertsInCategory;
			this.count();
			this.getRightWordDeclension();
		});
	}
}
