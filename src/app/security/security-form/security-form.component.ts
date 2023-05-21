import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastService } from 'angular-toastify';
import { Advert } from 'src/app/common/model/advert.model';
import { SecurityUpdate, SecurityAction, SecurityDetail } from 'src/app/common/model/security.model';
import { AdvertService } from 'src/app/common/service/advert.service';
import { AuthService } from 'src/app/common/service/auth.service';
import { ImageService } from 'src/app/common/service/image.service';
import { SecurityService } from 'src/app/common/service/security.service';

@UntilDestroy()
@Component({
	selector: 'app-security-form',
	templateUrl: './security-form.component.html',
	styleUrls: ['./security-form.component.css']
})
export class SecurityFormComponent implements OnDestroy, OnChanges {

	@Input()
	action?: SecurityAction;

	@Input()
	advert?: any;

	@Output()
	formCancel = new EventEmitter<void>();

	@Output()
	clearForm = new EventEmitter<void>();

	@Input()
	send = ''

	securityForm: FormGroup;

	hash?: string;

	email: string = '';

	validatedAdmin = false;

	constructor(
		private router: Router,
		private securityService: SecurityService,
		private imageService: ImageService,
		private advertService: AdvertService,
		private toastService: ToastService,
		private authService: AuthService
	) {
		this.validateAdmin();
		this.securityForm = new FormGroup({
			code: new FormControl(null, [Validators.required]),
			hash: new FormControl()
		});
	}
	
	ngOnChanges(changes: SimpleChanges): void {
		if (this.send != '') {
			this.createHash();
			this.send = '';
			this.getEmail();
		}
	}

	getEmail(): void {
		if (! this.advert) return;
		if (! this.advert.id) return;

		this.advertService.getAdvertById(this.advert.id).subscribe((advert: Advert) => {
			this.email = this.partiallyHideEmail(advert.contact.email);
		})
	}

	ngOnDestroy() {
		this.clearForm.emit();
	}

	/** @deprecated */
	public validateToken() {
		return this.authService.isLogged();
	}

	createHash() {
		this.toastService.success('Posielam požiadavku na server.');

		if (this.action?.action === 'delete') {
			let securityUpdate: SecurityUpdate = {
				advertId: this.advert.id,
				email: this.advert.contact.email
			}

			this.securityService.createHashForUpdate(securityUpdate).pipe(untilDestroyed(this)).subscribe((hash: SecurityDetail) => {
				this.hash = hash.hash;
				this.toastService.success(`Overovací kód bol odoslaný na e-mail.`);
			}, (error: Error) => {
				this.toastService.error(error.message);
			})
		}

		if (this.action?.action === 'create') {
			this.advert.imageId = 0;

			this.securityService.createHashFromAdvert(this.advert).pipe(untilDestroyed(this)).subscribe((hash: SecurityDetail) => {
				this.hash = hash.hash;
				this.toastService.success(`Overovací kód bol odoslaný na e-mail.`);
			}, (err: Error) => {
				this.toastService.error(err.message);
			});
		}

		if (this.action?.action === 'update') {
			let securityUpdate: SecurityUpdate = {
				advertId: this.advert.id,
				email: this.advert.contactEmail
			}

			this.advertService.getAdvertById(this.advert.id).subscribe((advert: Advert) => {
				securityUpdate.email = advert.contact.email;
				this.email = this.partiallyHideEmail(securityUpdate.email);
				this.securityService.createHashForUpdate(securityUpdate).pipe(untilDestroyed(this)).subscribe((hash: SecurityDetail) => {
					this.hash = hash.hash;
					this.toastService.success(`Overovací kód bol odoslaný na e-mail.`);
				}, (res) => {
					this.toastService.error(res.error.error);
				});
			})
		}
	}

	saveAdvert() {
		if (! this.authService.isTokenInLocalStorage()) {
			if (!this.advert) {
				this.toastService.error(`Nemožno vytvoriť prázdny inzerát.`);
				return;
			}
	
			this.verifyHashCode();
			return;
		}

		this.authService.validateToken().pipe(untilDestroyed(this)).subscribe({
			next: (v) => (v) ? this.sendFile() : console.log(v),
			error: (e) => console.error(e)
		})
	}

	validateAdmin() {
		if (! this.authService.isTokenInLocalStorage()) {
			return;
		}

		this.authService.validateToken().pipe(untilDestroyed(this)).subscribe({
			next: (v) => this.validatedAdmin = (v) ? true : false,
			error: (e) => console.error(e)
		})
	}

	private verifyHashCode() {
		let securityRequest = {
			code: this.securityForm.controls['code'].value,
			hash: this.hash || ''
		};

		this.securityForm.controls['code'].reset();

		this.securityService.checkCode(securityRequest).pipe(untilDestroyed(this)).subscribe((codeCheck: boolean) => {
			if (!codeCheck) {
				this.toastService.error(`Overenie nebolo úspešné.`);
				return;
			}

			if (this.action?.action === 'delete') {
				this.deleteAdvert();
				return;
			}

			if (this.action?.action === 'update') {
				this.sendFile();
				return;
			}

			if (this.action?.action === 'create') {
				this.sendFile();
				return;
			}
		}, (error: Error) => {
			this.toastService.error('Nastala chyba pri overovaní. Skúste to znova.');
		});
	}

	private deleteAdvert() {
		this.advertService.deleteAdvert(this.advert.id).pipe(untilDestroyed(this)).subscribe(() => {
			this.toastService.success(`Vymazanie inzerátu bolo úspešné.`);
			setTimeout(() => {
				this.redirectToHomePage('Budete presmerovaný na domovskú stránku.');
			}, 5000);
		}, () => {
			this.toastService.error(`Vymazanie inzerátu nebolo úspešné.`);
		});
	}

	private sendFile() {
		let fileElement = document.querySelector('#file') as HTMLInputElement;
		let files = fileElement.files as FileList | undefined;
		let file = files![0] as File;

		// TODO: Add max file size limit (10MB) = (10000kB) = (10 000 000B)

		if (!file) {
			if (this.action?.action == 'create') {
				this.advert.imageId = 0;
				this.createAdvert();
				return;
			}

			if (this.action?.action == 'update') {
				this.advertService.getAdvertById(this.advert.id).pipe(untilDestroyed(this)).subscribe((advert: Advert) => {
					this.advert.imageId = advert.image.id;
				}, null, () => {
					this.updateAdvert();
					return;
				});
				return;
			}
		}

		if (file) {
			this.imageService.uploadImage(file).pipe(untilDestroyed(this)).subscribe((imageId: number) => {
				this.advert.imageId = imageId;
				if (this.action?.action == 'update') {
					// TODO: Implementovať vymazávanie obrázku po UPDATE
					this.updateAdvert();
				}
				if (this.action?.action == 'create') {
					this.createAdvert();
				}
			})
		}
	}

	private createAdvert(): void {
		this.advertService.createAdvert(this.advert).pipe(untilDestroyed(this)).subscribe((advertId: string) => {
			this.redirectToAdvertDetail(advertId, `pridaný`);
		}, (error: Error) => {
			this.toastService.error(`Nastala chyba pri vytváraní inzerátu.\n${error}`);
		})
	}

	private updateAdvert(): void {
		this.advertService.updateAdvert(this.advert).pipe(untilDestroyed(this)).subscribe(() => {
			this.redirectToAdvertDetail(this.advert.id, `upravený`);
		});
	}

	private redirectToHomePage(message: string): void {
		this.clearForm.emit();

		window.alert(message);
		window.scrollTo(0, 0);
		this.router.navigate([`/`]);
	}

	private redirectToAdvertDetail(advertId: string, message: string) {
		/*
		this.clearForm.emit();

		window.alert(`Inzerát bol úspešne ${message}.\nBudete presmerovaný na stránku inzerátu.`);
		window.scrollTo(0, 0);
		this.router.navigate([`/advert/${advertId}`]);
		*/
		this.clearForm.emit();
		this.toastService.success(`Inzerát bol úspešne ${message}.`);
		this.toastService.success(`Budete presmerovaný na stránku inzerátu.`);
		
		setTimeout(() => {
			window.scrollTo(0, 0);
			this.router.navigate([`/advert/${advertId}`]);
		}, 5000);
	}

	partiallyHideEmail(email: string): string {
		if (! email) return '';
		return email.replace(/(\w{2})[\w.-]+@([\w.]+\w)/, "$1***@$2");
	}

}
