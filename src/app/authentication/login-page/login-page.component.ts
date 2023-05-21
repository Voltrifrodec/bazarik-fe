import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../common/model/auth.model';
import { AuthService } from '../../common/service/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

	loginForm: FormGroup;

	loggedInAsAdmin = false;

	constructor(
		private authService: AuthService,
		private router: Router
	) {
		this.validateAdmin();

		this.loginForm = new FormGroup({
			username: new FormControl(undefined, [Validators.required]),
			password: new FormControl(undefined, [Validators.required])
		});
	}

	login(): void {
		if (this.loginForm.valid) {
			if (this.loginForm.controls['username'].value && this.loginForm.controls['password'].value) {
				const auth: Auth = {
					username: this.loginForm.controls['username'].value,
					password: this.loginForm.controls['password'].value
				};
				this.authService.login(auth).subscribe({
					next: () => {
						this.router.navigate(['/admin']).finally(() => {
							this.reloadWindow();
						})
					}
				});
			}
		}
	}
	
	private validateAdmin() {
		if (! this.authService.isTokenInLocalStorage()) {
			this.unauthorizeUser();
			return;
		}

		this.authService.validateToken().pipe(untilDestroyed(this)).subscribe({
			next: (v) => {
				if (v) {
					this.loggedInAsAdmin = true;
					this.router.navigate(['/login']);
				} else {
					this.unauthorizeUser();
					this.reloadWindow();
				}
			},
			error: () => {
				this.unauthorizeUser();
			}
		});
	}

	private unauthorizeUser() {
		this.removeTokenFromLocalStorage();
	}

	private removeTokenFromLocalStorage() {
		this.authService.removeToken();
	}

	private reloadWindow() {
		window.location.reload();
	}
}
