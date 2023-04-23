import { Component, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { Advert } from 'src/app/common/model/advert.model';
import { AdvertService } from 'src/app/common/service/advert.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { SecurityAction } from 'src/app/common/model/security.model';

@UntilDestroy()
@Component({
  selector: 'app-advert-detail-page',
  templateUrl: './advert-detail-page.component.html',
  styleUrls: ['./advert-detail-page.component.css']
})
export class AdvertDetailPageComponent {

    faClipboard = faClipboard;

	@Output()
	action: SecurityAction = {
		action: 'delete'
	}

	@Output()
	public advert?: Advert;

	private advertId: string | null;

	@Output()
	get advertData(): Advert {
		return this.advert!;
	}

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
				this.router.navigate(['404']);
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

	sendData() {
		this.router.navigate([`advert/edit`]);
	}

	cancel(): void {
		this.router.navigate([`advert/${this.advertId}`]);
	}


    async copyHref() {
        console.log(this.router.url);
        try {
            await navigator.clipboard.writeText('localhost:4200' + this.router.url.toString()); // TODO: Nahradiť localhost názvom domény
            alert('Odkaz na inzerát bol úspešne skopírovaný.');
        }
        catch (err) {
            alert('Nepodarilo sa skopírovať odkaz na inzerát!')
        }
    }

	editAdvert() {
		this.router.navigate([`/advert/edit/${this.advertId}`]);
	}

	deleteAdvert() {

	}
}
