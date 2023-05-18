import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Advert } from '../common/model/advert.model';
import { Subsubcategory } from '../common/model/subsubcategory.model';
import { AdvertService } from '../common/service/advert.service';
import { SubsubcategoryService } from '../common/service/subsubcategory.service';

@UntilDestroy()
@Component({
	selector: 'app-subsubcategory',
	templateUrl: './subsubcategory.component.html',
	styleUrls: ['./subsubcategory.component.css']
})
export class SubsubcategoryComponent implements OnInit {

	subsubcategoryId: number;
	subsubcategory?: Subsubcategory;

	adverts?: Advert[];

	numberOfAdvertsWordDeclension = '';
	levelWord = 'podpodkategórii';

	constructor(
		private subsubcategoryService: SubsubcategoryService,
		private advertService: AdvertService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.subsubcategoryId = this.route.snapshot.params['subsubcategoryId'];
		this.getSubsubcategoryById();
		this.getAdverts();
	}

	getSubsubcategoryById(): void {
		this.subsubcategoryService.getSubsubcategoryById(this.subsubcategoryId).pipe(untilDestroyed(this)).subscribe((subsubcategory: Subsubcategory) => {
			this.subsubcategory = subsubcategory;
		}, () => {
			this.router.navigate(['404']);
		});
	}

	getAdverts(): void {
		this.advertService.getAllAdvertsBySubsubcategoryId(this.subsubcategoryId).pipe(untilDestroyed(this)).subscribe((adverts: Advert[]) => {
			this.adverts = adverts;
			this.getRightWordDeclension();
		});
	}

	ngOnInit(): void {
		this.getAdverts();
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
