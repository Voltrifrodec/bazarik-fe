import { Component, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as fa from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
	fa = fa;

	searchForm: FormGroup;

	constructor(private router: Router) {
		this.searchForm = new FormGroup({
			query: new FormControl("ram", [Validators.required])
		});
	}

	public search(): void {
		if (this.searchForm.invalid) {
			window.alert("Pre vyhľadávanie je nutné zadať text.");
			return;
		}
		
		let query = this.searchForm.controls['query'].value as String;

		if (query.trim().length < 3) {
			window.alert("Pre vyhľadávanie sú nutné aspoň tri znaky.");
			return;
		}

		console.log(query);
		this.router.navigate([`search/${query}`]);
	}
}
