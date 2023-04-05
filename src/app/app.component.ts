import { Component } from '@angular/core';
import * as fa from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'bazarik-fe';

	fa = fa;
}
