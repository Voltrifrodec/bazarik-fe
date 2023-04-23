import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Advert } from 'src/app/common/model/advert.model';
import { Category } from 'src/app/common/model/category.model';
import { AdvertService } from 'src/app/common/service/advert.service';
import { CategoryService } from 'src/app/common/service/category.service';

@UntilDestroy()
@Component({
	selector: 'app-home',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	constructor(
		private service: CategoryService,
		private advertService: AdvertService
	) {
		this.getCategories();
		this.getRecentAdverts();
	}

	categories?: Category[];
	adverts?: Advert[];

	getCategories(): void {
		this.service.getAllCategories().pipe(untilDestroyed(this)).subscribe((categories: Category[]) => {
			this.categories = categories;
		});
	}

	getRecentAdverts(): void {
		this.advertService.getRecentAdverts(4).pipe(untilDestroyed(this)).subscribe((adverts: Advert[]) => {
			this.adverts = adverts;
		});
	}

	ngOnInit(): void {
		this.getCategories();
		this.getRecentAdverts();
	}

}
