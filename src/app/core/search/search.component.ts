import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Advert } from 'src/app/common/model/advert.model';
import { AdvertService } from 'src/app/common/service/advert.service';

@UntilDestroy()
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
    fa = fa;

	adverts?: Advert[];

	@Input()
	private query: string | null;

	constructor(
		private route: ActivatedRoute,
		private advertService: AdvertService,
		private router: Router
	) {
		this.query = route.snapshot.paramMap.get('query');
		this.searchAdvertsByQuery();
	}

	private searchAdvertsByQuery(): void {
		console.log(this.query);
		if (this.query) {
			this.advertService.getAllAdvertsByQuery(this.query).subscribe((adverts: Advert[]) => {
				this.adverts = adverts;
				console.log(this.adverts);
				
				this.router.dispose();
			});
		}
	}
}
