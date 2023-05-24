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

	adminButton = true;
	adminDropdown: boolean = false;

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
		if (! this.authService.getToken()) {
			this.unauthorizeUser();
			return;
		}

		this.authService.validateToken().pipe(untilDestroyed(this)).subscribe({
			next: (v) => {
				console.log(v);
				this.adminButton = (v) ? true : false;
			},
			error: (e) => {
				this.unauthorizeUser();
				console.error(e);
			}
		})
	}

	logout(): void {
		this.authService.logout().subscribe();
		this.authService.removeToken();
		this.router.navigate(['/']).then(() =>{
			this.reloadWindow();
		});
	}

	toggleDropdown(): void {
		this.adminDropdown = this.adminDropdown ? false : true;
	}

	reloadWindow() {
		window.location.reload();
	}

	private unauthorizeUser() {
		this.removeTokenFromLocalStorage();
	}

	private removeTokenFromLocalStorage() {
		this.authService.removeToken();
	}
}
