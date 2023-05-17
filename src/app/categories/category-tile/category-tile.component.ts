import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Category } from 'src/app/common/model/category.model';


@UntilDestroy()
@Component({
	selector: 'app-category-tile',
	templateUrl: './category-tile.component.html',
	styleUrls: ['./category-tile.component.css']
})
export class CategoryTileComponent implements OnInit {

	@Input()
	category?: Category;

	emoji?: string;


	numberOfAdvertsWordDeclension: string = '';
	counter = 0;

	constructor() {}

	ngOnInit(): void {
		this.count();
		this.getRightWordDeclension();
		this.setEmoji();
	}
	
	count(): void {
		if (! this.category?.numberOfAdverts) return;

		if (this.counter < this.category.numberOfAdverts) {
			this.counter++;
			setTimeout(() => {
				this.count();
			}, 2 / this.category.numberOfAdverts ** 4);
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
