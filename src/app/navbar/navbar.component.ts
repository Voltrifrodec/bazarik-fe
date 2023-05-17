import { Component, OnChanges, Output, SimpleChanges, destroyPlatform } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../common/service/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
	faSearch = faSearch;
	faPlus = faPlus;

	adminDropdown: boolean = !true;

	searchForm: FormGroup;

	constructor(
		private authService: AuthService,
		private router: Router
	) {
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

	isLogged(): boolean {
		return this.authService.isLogged();
	}

	logout(): void {
		this.authService.logout().subscribe();
		this.router.navigate(['']);
		localStorage.removeItem('token');
	}

	toggleDropdown(): void {
		this.adminDropdown = this.adminDropdown ? false : true;
	}
}
