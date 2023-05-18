import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../common/service/auth.service';
import { faExpandArrowsAlt, faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AdvertService } from '../common/service/advert.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AdvertResponse } from '../common/model/advert.model';
import { Pagination } from '../common/model/pagination.model';

@UntilDestroy()
@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent {

	faBin = faTrash;
	faArrow = faExpandArrowsAlt;
	faPen = faPen;
	faSearch = faSearch;

	adminDropdown: boolean = !true;

	adverts?: AdvertResponse;

	constructor(
		private advertService: AdvertService,
		private authService: AuthService,
		private router: Router
	) {
		this.getAllAdverts();
		
		if (!this.checkLogged()) {
			this.router.navigate(['/'])
			window.alert(`Na túto stránku majú prístup len prihlásení administrátori.`);
			return;
		}
	}

	getAllAdverts(pagination?: Pagination): void {
		this.advertService.getAllAdverts(pagination).pipe(untilDestroyed(this)).subscribe((adverts: AdvertResponse) => {
			this.adverts = adverts;
		});
	}

	deleteAdvertById(advertId: string) {
		this.authService.validateToken()?.pipe(untilDestroyed(this)).subscribe(() => {
			if (window.confirm(`Naozaj chcete vymazať tento inzerát?\n${advertId}`)) {
				this.advertService.deleteAdvert(advertId).pipe(untilDestroyed(this)).subscribe(() => {
					window.alert('Inzerát bol úspešne vymazaný.');
				});
			}
		})
	}

	deleteAdvertsByIds(advertIds: string[]) {
		if (! advertIds) {
			window.alert(`Neboli poslané žiadne Idečka`);
			return;
		}
		
		if (!this.checkLogged()) {
			window.alert('Na vymazanie inzerátov musíte byť prihlásení ako administrátor.');
			return;
		}

		advertIds.forEach((advertId) => {
			this.advertService.deleteAdvert(advertId).pipe(untilDestroyed(this)).subscribe(() => {
				console.log(`Deleted advert, ${advertId}`);
			});
		});

		window.alert(`Počet vymazaných inzerátov: ${advertIds.length}`);

		let pagination: Pagination = {
			page: this.adverts?.pageable.pageNumber || 0,
			size: this.adverts?.pageable.pageSize || 10,
			filter: {
				query: ''
			}
		}

		this.getAllAdverts(pagination);
	}

	checkLogged(): boolean {
		return this.authService.isLogged() ? true : false;
	}

	public search(): void {
		if (true) {
			window.alert(`Táto funkcia nie je zatiaľ implementovaná.`);
			return;
		}
	}
}
