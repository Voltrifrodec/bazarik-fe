import { Component } from '@angular/core';
import { faExclamationTriangle, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-pagenotfound',
	templateUrl: './pagenotfound.component.html',
	styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent {
	faExclamationTriangle = faExclamationTriangle;
	faHome = faHome;
}
