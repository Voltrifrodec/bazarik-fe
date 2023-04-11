import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { Advert } from 'src/app/common/model/advert.model';
import { AdvertService } from 'src/app/common/service/advert.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-advert-detail-page',
  templateUrl: './advert-detail-page.component.html',
  styleUrls: ['./advert-detail-page.component.css']
})
export class AdvertDetailPageComponent {

	advert?: Advert;

	private advertId: string | null;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private service: AdvertService,
		private toastService: ToastService
	) {
		this.advertId = route.snapshot.paramMap.get('advertId');
		this.getAdvert();
	}

	getAdvert(): void {
		if (this.advertId) {
			this.service.getAdvertById(this.advertId).pipe(untilDestroyed(this)).subscribe((advert: Advert) => {
				this.advert = advert;
			}, () => {
				this.router.navigate([`404`]);
			});
		}
	}

	updateAdvert(advert: Advert): void {
		this.service.updateAdvert(advert).pipe(untilDestroyed(this)).subscribe(() => {
			this.toastService.success('Inzerát bol úspešne zmenený.');
		}, () => {
			this.toastService.error('Inzerát nebol úspešne zmenený.');
		})
	}

	cancel(): void {
		this.router.navigate([`advert/${this.advertId}`]);
	}

}
