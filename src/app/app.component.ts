import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './common/service/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'bazarik-fe';

	constructor(
		private authService: AuthService,
		private router: Router
	) {}


	logout(): void  {
		this.authService.logout().subscribe(() => {
			localStorage.removeItem('token');
			// localStorage.clear(); //? Skôr nie?
			this.router.navigate(['/login']);
		});
	}

}
