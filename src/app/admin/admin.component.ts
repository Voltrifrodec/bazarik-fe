import { Component, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../common/service/auth.service';
import { faExpandArrowsAlt, faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AdvertService } from '../common/service/advert.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Advert, AdvertResponse } from '../common/model/advert.model';
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

	searchForm: FormGroup;

	adverts?: AdvertResponse;

	uuids: Array<string> = [];

	form: FormGroup;

	constructor(
		private advertService: AdvertService,
		private authService: AuthService,
		private router: Router
	) {
		this.getAllAdverts();

		this.searchForm = new FormGroup({
			query: new FormControl("", [Validators.required])
		});
		
		this.form = new FormGroup({
			checkboxToggle: new FormControl(false, [])
		})
		
		if (!this.checkLogged()) {
			window.alert(`Na túto stránku majú prístup len prihlásení administrátori.`);
			this.router.navigate(['/'])
			return;
		}
	}

	getAllAdverts(pagination?: Pagination): void {
		console.log(pagination);
		this.advertService.getAllAdverts(pagination).pipe(untilDestroyed(this)).subscribe((adverts: AdvertResponse) => {
			this.adverts = adverts;
		});
	}

	deleteAdvertById(advertId: string) {
		console.log(advertId);
		this.authService.validateToken()?.pipe(untilDestroyed(this)).subscribe(() => {
			if (window.confirm(`Naozaj chcete vymazať tento inzerát?\n${advertId}`)) {
				this.advertService.deleteAdvert(advertId).pipe(untilDestroyed(this)).subscribe(() => {
					window.alert('Inzerát bol úspešne vymazaný.');
				});
			}
		})
	}

	deleteAdvertsByIds(advertIds: string[]) {
		console.log(advertIds);
		if (! advertIds) {
			window.alert(`Neboli poslané žiadne Idečka`);
			return;
		}
		advertIds.forEach((advertId) => {
			console.log(`Deleting advert, ${advertId}`);
			/* this.advertService.deleteAdvert(advertId).pipe(untilDestroyed(this)).subscribe(() => {
				console.log(`Deleted advert, ${advertId}`);
			}); */
		});
	}

	bulkDelete(): void {
		this.addToList();

		if (this.checkEmptyList()) {
			window.alert('Na vymazanie inzerátov je nutné označiť aspoň jeden inzerát.');
			return;
		}

		if (!window.confirm(`Počet inzerátov na vymazanie: ${this.uuids.length}\nSte si istí?`)) {
			this.removeUuidsFromList();
			return;
		}

		if (!this.checkLogged()) {
			window.alert('Na vymazanie inzerátov musíte byť prihlásení ako administrátor.');
			this.removeUuidsFromList();
			return;
		}

		this.uuids.forEach((uuid) => {
			console.log(`Deleting advert, ${uuid}`);
			this.advertService.deleteAdvert(uuid).pipe(untilDestroyed(this)).subscribe(() => {
				console.log(`Deleted advert, ${uuid}`);
			});
		});

		this.removeUuidsFromList()

		window.location.reload();
	}

	removeUuidsFromList(): void {
		this.uuids = [];
	}

	checkEmptyList(): boolean {
		return this.uuids.length === 0 ? true : false;
	}

	checkLogged(): boolean {
		return this.authService.isLogged() ? true : false;
	}

	addToList(): void {
		let checkboxes = document.getElementsByName('checkbox');

		checkboxes.forEach((checkbox) => {
			let s = checkbox as HTMLInputElement;
			if (s.checked) {
				this.uuids.push(s.value);
			}
		});
	}

	public search(): void {
		if (true) {
			window.alert(`Táto funkcia nie je zatiaľ implementovaná.`);
			return;
		}

		if (this.searchForm.invalid) {
			window.alert("Pre vyhľadávanie je nutné zadať text.");
			return;
		}

		const query = this.searchForm.controls['query'].value as string;

		if (query.trim().length == 0) {
			this.searchForm.controls['query'].setValue('');
		}

		if (query.trim().length < 3) {
			window.alert("Pre vyhľadávanie je nutné zadať aspoň tri znaky.");
			return;
		}

		this.router.navigate([`search/${query}`]);
	}
}
