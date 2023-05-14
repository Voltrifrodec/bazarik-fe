import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authentication/service/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'bazarik-fe';

	constructor(private authService: AuthService, private router: Router) {
		console.log('User is logged? → ', this.authService.isLogged());
	}


	logout(): void  {
		this.authService.logout().subscribe(() => {
			this.router.navigate(['/login']);
			localStorage.removeItem('token');
			localStorage.clear(); //? Skôr nie?
		});
	}

}
