import { Component, OnChanges, Output, SimpleChanges, destroyPlatform } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSearch, faPlus, faList, faArrowRight, faArrowAltCircleRight, faChevronCircleRight, faLongArrowAltRight, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../common/service/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
	faSearch = faSearch;
	faPlus = faPlus;
	faList = faList;
	faSignOut = faSignOutAlt;
	faAdmin = faUser;

	// TODO: ZMENIŤ
	adminButton = true;
	adminDropdown: boolean = true;

	searchForm: FormGroup;

	constructor(
		private authService: AuthService,
		private router: Router
	) {
		this.isLogged();

		this.searchForm = new FormGroup({
			query: new FormControl("", [Validators.required])
		});
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

	isLogged() {
		this.authService.validateToken().pipe(untilDestroyed(this)).subscribe({
			next: (v) => {
				// TODO: IMPLEMENT
				console.log(v);
				this.adminButton = (v) ? true : false;
				// this.adminDropdown = 
			}
		})
	}

	logout(): void {
		this.authService.logout().subscribe();
		this.router.navigate(['']);
		this.authService.removeToken();
	}

	toggleDropdown(): void {
		this.adminDropdown = this.adminDropdown ? false : true;
	}
}
