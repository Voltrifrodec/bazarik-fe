import { Component } from '@angular/core';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'bazarik-fe';

	iconSearch = faSearch;
	iconAddNew = faPlus;
}
