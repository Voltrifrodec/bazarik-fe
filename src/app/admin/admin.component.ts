import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../common/service/auth.service';
import { faArrowAltCircleUp, faCaretSquareDown, faExpandArrowsAlt, faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AdvertService } from '../common/service/advert.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Advert } from '../common/model/advert.model';
import { CategoryTileComponent } from '../categories/category-tile/category-tile.component';

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

	adverts?: Advert[];

	uuids: Array<string> = [];

	constructor(
		private advertService: AdvertService,
		private authService: AuthService,
		private router: Router
	) {
		this.searchForm = new FormGroup({
			query: new FormControl("", [Validators.required])
		});
		this.getAllAdverts();
	}

	private getAllAdverts(): void {
		this.advertService.getAllAdverts().pipe(untilDestroyed(this)).subscribe((adverts: Advert[]) => {
			this.adverts = adverts;
		});
	}

	deleteAdvertById(advertId: string) {
		this.authService.validateToken().pipe(untilDestroyed(this)).subscribe(() => {
			if (window.confirm(`Naozaj chcete vymazať tento inzerát?\n${advertId}`)) {
				this.advertService.deleteAdvert(advertId).pipe(untilDestroyed(this)).subscribe(() => {
					window.alert('Inzerát bol úspešne vymazaný.');
				});
			}
		})
	}

	bulkDelete(): void {
		this.addToList();

		if (this.checkEmptyList()) {
			window.alert('Na vymazanie inzerátov je nutné označiť aspoň jeden inzerát.');
			return;
		}

		console.log(this.uuids);

		if (window.confirm(`Počet inzerátov na vymazanie: ${this.uuids.length}\nSte si istí?`)) {
			if (! this.checkLogged()) {
				window.alert('Na vymazanie inzerátov musíte byť prihlásení ako administrátor.');
				this.uuids = [];
				return;
			}

			this.uuids.forEach((uuid) => {
				console.log(uuid);
				this.advertService.deleteAdvert(uuid).pipe(untilDestroyed(this)).subscribe(() => {
					console.log(`Deleted advert, ${uuid}`);
				});
			});
			// console.log(this.router.url);
			this.router.navigate([this.router.url]);
		} else {
			this.uuids = [];
		}
	}

	checkEmptyList(): boolean {
		return this.uuids.length === 0 ? true : false;
	}

	checkLogged(): boolean {
		return this.authService.isLogged() ? true : false;
	}

	addToList(): void {
		let checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));

		checkboxes.forEach((checkbox) => {
			let s = checkbox as HTMLInputElement;
			if (s.checked) {
				this.uuids.push(s.value);
			}
		});
	}

	copy(text: any): void {
		navigator.clipboard.writeText(text);
		window.alert(`Text\n${text}\nbol úspešne skopírovaný.`);
	}

	getDateFromTimestamp(timestamp: any) {
		return new Date(timestamp).toLocaleString();
	}

	public search(): void {
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
