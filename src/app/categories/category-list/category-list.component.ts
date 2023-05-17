import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/common/model/category.model';

@Component({
	selector: 'app-category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

	@Input()
	categories?: Category[];

	getEmojis() {
		this.categories?.map((category: Category) => {
			console.log('Emoji:',category.emoji);
		});
	}

	ngOnInit(): void {
		this.getEmojis();
	}

}
