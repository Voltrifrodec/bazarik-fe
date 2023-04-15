import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Advert } from 'src/app/common/model/advert.model';
import { AdvertService } from 'src/app/common/service/advert.service';

@UntilDestroy()
@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnChanges {

	adverts?: Advert[];

	@Input()
	public query: string | null;

	constructor(
		private route: ActivatedRoute,
		private advertService: AdvertService,
		private router: Router
	) {
		this.query = route.snapshot.paramMap.get('query');
		this.searchAdvertsByQuery();
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log(this.route.snapshot.paramMap.get('query'));
		this.query = this.route.snapshot.paramMap.get('query');
		this.searchAdvertsByQuery();
		console.log(this.query);
	}
	
	private searchAdvertsByQuery(): void {
		console.log(this.query);
		if (this.query) {
			this.advertService.getAllAdvertsByQuery(this.query).pipe(untilDestroyed(this)).subscribe((adverts: Advert[]) => {
				this.adverts = adverts;
			});
		}
	}
}
