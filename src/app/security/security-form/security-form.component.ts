import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastService } from 'angular-toastify';
import { Advert } from 'src/app/common/model/advert.model';
import { SecurityUpdate, SecurityAction } from 'src/app/common/model/security.model';
import { AdvertService } from 'src/app/common/service/advert.service';
import { ImageService } from 'src/app/common/service/image.service';
import { SecurityService } from 'src/app/common/service/security.service';

@UntilDestroy()
@Component({
	selector: 'app-security-form',
	templateUrl: './security-form.component.html',
	styleUrls: ['./security-form.component.css']
})
export class SecurityFormComponent implements OnDestroy {

	@Input()
	action?: SecurityAction;

	@Input()
	advert?: any;

	@Output()
	formCancel = new EventEmitter<void>();

	@Output()
	clearForm = new EventEmitter<void>();

	securityForm: FormGroup;

	hash?: string;

	constructor(
		private router: Router,
		private securityService: SecurityService,
		private imageService: ImageService,
		private advertService: AdvertService,
		private toastService: ToastService
	) {
		this.securityForm = new FormGroup({
			code: new FormControl(),
			hash: new FormControl()
		});
	}

	ngOnDestroy() {
		this.clearForm.emit();
	}

	createHash() {
		if (this.action?.action === 'delete') {
			let securityUpdate: SecurityUpdate = {
				advertId: this.advert.id,
				email: this.advert.contact.email
			}

			this.securityService.createHashForUpdate(securityUpdate).pipe(untilDestroyed(this)).subscribe((hash: string) => {
				this.hash = hash;
			}, (error: Error) => {
				this.toastService.error(error.message);
				console.log(error);
			})
		}

		if (this.action?.action === 'create') {
			this.advert.imageId = 0;

			this.securityService.createHashFromAdvert(this.advert).pipe(untilDestroyed(this)).subscribe((hash: string) => {
				this.hash = hash;
			}, (err: Error) => {
				this.toastService.error(err.message);
			});
		}

		if (this.action?.action === 'update') {
			let securityUpdate: SecurityUpdate = {
				advertId: this.advert.id,
				email: this.advert.contactEmail
			}

			this.securityService.createHashForUpdate(securityUpdate).pipe(untilDestroyed(this)).subscribe((hash: string) => {
				this.hash = hash;
			}, (err: Error) => {
				this.toastService.error(err.message);
			})
		}
	}

	saveAdvert() {
		if (!this.advert) {
			this.toastService.error(`Nemožno vytvoriť prázdny inzerát.`);
			return;
		}

		this.verifyHashCode();
	}

	private verifyHashCode() {
		let securityRequest = {
			code: this.securityForm.controls['code'].value,
			hash: this.hash!
		};

		this.securityForm.controls['code'].reset();

		this.securityService.checkCode(securityRequest).pipe(untilDestroyed(this)).subscribe((codeCheck: boolean) => {
			if (!codeCheck) {
				this.toastService.error(`Overenie nebolo úspešné. Skúste to znova.`);
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
			console.error(error);
		});
	}

	private deleteAdvert() {
		this.advertService.deleteAdvert(this.advert.id).pipe(untilDestroyed(this)).subscribe(() => {
			this.toastService.success(`Vymazanie inzerátu bolo úspešné.`);
			this.toastService.success(`Budete presmerovaný na hlavnú stránku.`);
			setTimeout(() => {
				window.scrollTo(0, 0);
				this.router.navigate(['/']);
			}, 5000);
		}, () => {
			this.toastService.error(`Vymazanie inzerátu nebolo úspešné.`);
		});
	}

	private sendFile() {
		let fileElement = document.querySelector('#file') as HTMLInputElement;
		let files = fileElement.files as FileList | undefined;
		let file = files![0] as File;

		if (!file) {
			this.advert.imageId = 0;

			this.sendAdvert(this.advert);
			return;
		}

		this.imageService.uploadImage(file).pipe(untilDestroyed(this)).subscribe((imageId: number) => {
			if (imageId) {
				this.advert.imageId = imageId;

				this.sendAdvert(this.advert);
			}
		})
	}

	private sendAdvert(advert: Advert): void {
		this.advertService.createAdvert(advert).pipe(untilDestroyed(this)).subscribe((advertId: string) => {
			this.redirectToAdvertDetail(advertId);
		}, (error: Error) => {
			this.toastService.error(`Nastala chyba pri vytváraní inzerátu.\n${error}`);
			console.error(error);
		})
	}

	private redirectToHomePage(advertId: string, message: string): void {
		this.clearForm.emit();

		window.alert(message);
		window.scrollTo(0, 0);
		this.router.navigate([`/advert/${advertId}`]);
	}

	private redirectToAdvertDetail(advertId: string) {
		this.clearForm.emit();

		window.alert(`Inzerát bol úspešne pridaný.\nBudete presmerovaný na stránku inzerátu.`);
		window.scrollTo(0, 0);
		this.router.navigate([`/advert/${advertId}`]);
	}

}
