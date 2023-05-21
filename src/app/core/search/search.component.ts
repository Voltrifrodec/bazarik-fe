import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Advert } from 'src/app/common/model/advert.model';
import { AdvertService } from 'src/app/common/service/advert.service';

@UntilDestroy()
@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

	adverts?: Advert[];
	pageLoaded: boolean = false;

	@Output()
	public queryOutput: string | null;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private http: HttpClient
	) {
		this.queryOutput = this.route.snapshot.paramMap.get('query');

		this.router.events.subscribe(() => {
			this.queryOutput = this.route.snapshot.paramMap.get('query');
		})
	}


	ngOnInit(): void {

		this.router.events.subscribe(Response => {
			if (Response) {
				this.pageLoaded = true;
				return;
			}
		});

	}

}
