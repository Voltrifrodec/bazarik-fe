import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../common/model/auth.model';
import { AuthService } from '../../common/service/auth.service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

	loginForm: FormGroup = new FormGroup({
		username: new FormControl(undefined, [Validators.required]),
		password: new FormControl(undefined, [Validators.required])
	});

	constructor(
		private authService: AuthService,
		private router: Router
	) { }

	login(): void {
		if (this.loginForm.valid) {
			if (this.loginForm.controls['username'].value && this.loginForm.controls['password'].value) {
				const auth: Auth = {
					username: this.loginForm.controls['username'].value,
					password: this.loginForm.controls['password'].value
				};
				this.authService.login(auth).subscribe(() => {
					this.router.navigate(['/admin']);
				});
			}
		}
	}
	
	isLogged(): boolean {
		return this.authService.isLogged();
	}

}
