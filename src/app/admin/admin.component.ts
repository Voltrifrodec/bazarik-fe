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

	validatedAdmin = false;

	adverts?: AdvertResponse;

	constructor(
		private advertService: AdvertService,
		private authService: AuthService,
		private router: Router
	) {
		this.validateAdmin();
		this.getAllAdverts();
	}

	getAllAdverts(pagination?: Pagination): void {
		this.advertService.getAllAdverts(pagination).pipe(untilDestroyed(this)).subscribe((adverts: AdvertResponse) => {
			this.adverts = adverts;
		});
	}

	deleteAdvertById(advertId: string) {
		if (! this.checkTokenInLocalStorage()) {
			window.alert('Token could not be found.');
			return;
		}

		this.authService.validateToken().pipe(untilDestroyed(this)).subscribe({
			next: (v) => (v) ? this.deleteAdvert(advertId) : console.log(v),
			error: (e) =>  {
				console.error(e);
			}
		});
	}

	private checkTokenInLocalStorage() {
		return this.authService.getToken();
	}

	private validateAdmin() {
		if (! this.checkTokenInLocalStorage()) {
			window.alert('Token could not be found.');
			return;
		}

		this.authService.validateToken().pipe(untilDestroyed(this)).subscribe({
			next: (v) => {
				this.validatedAdmin = (v) ? true : false;
			},
			error: (e) => {
				console.error(e);
			}
		});
	}

	private deleteAdvert(advertId: string) {
		if (window.confirm(`Naozaj chcete vymazať tento inzerát?\n${advertId}`)) {
			this.advertService.deleteAdvert(advertId).pipe(untilDestroyed(this)).subscribe(() => {
				window.alert('Inzerát bol úspešne vymazaný.');
			}); 
		}
	}

	deleteAdvertsByIds(advertIds: string[]) {
		if (! this.checkTokenInLocalStorage()) {
			window.alert('Token could not be found.');
			return;
		}

		if (! advertIds) {
			window.alert(`Neboli poslané žiadne Idečka`);
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

	private removeTokenFromLocalStorage() {
		this.authService.removeToken();
	}

	public search(): void {
		if (true) {
			window.alert(`Táto funkcia nie je zatiaľ implementovaná.`);
			return;
		}
	}
}
