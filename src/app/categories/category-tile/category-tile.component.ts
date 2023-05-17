import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Category } from 'src/app/common/model/category.model';
import { AdvertService } from 'src/app/common/service/advert.service';

import { faBox } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/common/service/category.service';

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

	emoji?: string;

	numberOfAdvertsInCategory: number = 0;
	numberOfAdvertsWordDeclension: string = '';
	counter = 0;
	


	constructor(private advertService: AdvertService, private categoryService: CategoryService) {
	}

	ngOnInit(): void {
		this.getNumberOfAdvertsInCategoryByCategoryId();
		this.setEmoji();
	}
	
	count(): void {
		if (this.counter < this.numberOfAdvertsInCategory) {
			this.counter++;
			setTimeout(() => {
				this.count();
			}, 2 / this.numberOfAdvertsInCategory ** 4);
		}
	}

	setEmoji(): void {
		if(this.category?.emoji) {
			let codePoint: number = parseInt(this.category.emoji.substring(1), 16);
			this.emoji = String.fromCodePoint(codePoint);
		}
		else {
			this.emoji = '\u{1F4E6}';
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
