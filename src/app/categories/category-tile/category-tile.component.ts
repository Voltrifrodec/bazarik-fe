import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Category } from 'src/app/common/model/category.model';
import { AdvertService } from 'src/app/common/service/advert.service';

import { faBox }from '@fortawesome/free-solid-svg-icons';

@UntilDestroy()
@Component({
  selector: 'app-category-tile',
  templateUrl: './category-tile.component.html',
  styleUrls: ['./category-tile.component.css']
})
export class CategoryTileComponent implements OnChanges {

	faBox = faBox;

	@Input()
	category?: Category;

	numberOfAdvertsInCategory: number = 0;
	numberOfAdvertsWordDeclension: string = '';
	counter = 0;
	
	constructor(
		private advertService: AdvertService
	) {}

	ngOnChanges(changes: SimpleChanges): void {
		this.getNumberOfAdvertsInCategoryByCategoryId();
	}

	count(): void {
		if (this.counter < this.numberOfAdvertsInCategory) {
			this.counter++;
			this.count();
			setTimeout(() => {
				this.count();
			}, 10 / this.numberOfAdvertsInCategory);
			// }, /* this.numberOfAdvertsInCategory /  */1.618034 / this.numberOfAdvertsInCategory);
		}
	}

	getRightWordForm(): void {
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
		if (! this.category) return;
		this.advertService.getNumberOfAdvertsInCategoryByCategoryId(this.category.id).pipe(untilDestroyed(this)).subscribe((numberOfAdvertsInCategory: number) => {
			this.numberOfAdvertsInCategory = numberOfAdvertsInCategory;
			this.count();
			this.getRightWordForm();
		});
	}
}
