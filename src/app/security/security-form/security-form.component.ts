import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastService } from 'angular-toastify';
import { Advert } from 'src/app/common/model/advert.model';
import { SecurityUpdate } from 'src/app/common/model/security-update.model';
import { AdvertService } from 'src/app/common/service/advert.service';
import { ImageService } from 'src/app/common/service/image.service';
import { SecurityService } from 'src/app/common/service/security.service';

@UntilDestroy()
@Component({
	selector: 'app-security-form',
	templateUrl: './security-form.component.html',
	styleUrls: ['./security-form.component.css']
})
export class SecurityFormComponent implements OnInit, OnDestroy {

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

	ngOnInit(): void {
		// this.createHash();
	}

	createHash() {
		console.log(this.advert);
		if (this.router.url.includes('advert/edit')) {
			let securityUpdate: SecurityUpdate = {
				advertId: this.advert.id,
				email: this.advert.contactEmail
			}
			this.securityService.createHashForUpdate(securityUpdate).pipe(untilDestroyed(this)).subscribe((hash: string) => {
				this.hash = hash;
			}, (err: Error) => {
				this.toastService.error(err.message);
			})
		} else {
			this.advert.imageId = 0;
			this.securityService.createHashFromAdvert(this.advert).pipe(untilDestroyed(this)).subscribe((hash: string) => {
				this.hash = hash;
			}, (err: Error) => {
				this.toastService.error(err.message);
			});
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
			if (codeCheck) {
				this.sendFile();
			} else {
				this.toastService.error(`Overenie nebolo úspešné. Skúste to znova.`);
			}
		}, (error: Error) => {
			this.toastService.error('Nastala chyba pri overovaní. Skúste to znova.');
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
			this.clearForm.emit();
			this.redirectToHomePage(advertId);
		}, (error: Error) => {
			this.toastService.error(`Nastala chyba pri vytváraní inzerátu.\n${error}`);
		})
	}

	private redirectToHomePage(advertId?: string): void {
		window.confirm("Inzerát bol úspešne pridaný.\nBudete presmerovaný na stránku inzerátu.");

		window.scrollTo(0, 0);

		this.router.navigate([`/advert/${advertId}`]);
	}

}
