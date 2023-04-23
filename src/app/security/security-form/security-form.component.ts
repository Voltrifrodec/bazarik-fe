import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
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
export class SecurityFormComponent implements OnInit{

	@Input()
	advert?: any;

	@Output()
	formCancel = new EventEmitter<void>();

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
			})
		} else {
			this.advert.imageId = 0;
			this.securityService.createHashFromAdvert(this.advert).pipe(untilDestroyed(this)).subscribe((hash: string) => {
				this.hash = hash;
			});
		}
	}

	saveAdvert() {
		if (!this.advert) {
			// TODO: Toast service error => nemožno vytvoriť prázdny inzerát
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
				// TODO: ToastService na zlé overenie.
				window.alert('Overenie nebolo úspešné.');
			}
		}, () => {
			console.log('error');
			// TODO: ToastService pre error
			return;
		});

		this.saveToLocalStorage();
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
			this.redirectToHomePage(advertId);
			this.clearLocalStorage();
		}, (error: Error) => {
			// TODO: ToastService pre error
			console.error(error);
		})
	}


	private redirectToHomePage(advertId?: string): void {
		window.confirm("Inzerát bol úspešne pridaný.\nBudete presmerovaný na stránku inzerátu.");
		window.scrollTo(0, 0);

		this.router.navigate([`/advert/${advertId}`]);

		this.clearLocalStorage();
	}

	saveToLocalStorage(): void {
		/* let advert = this.prepareAdvert();

		for (const [key, value] of Object.entries(advert)) {
			if (value == null) continue;
			if (String(value).trim() != null) {
				localStorage.setItem(key, String(value));
			}
		} */
	}

	clearLocalStorage(): void {
		localStorage.clear();
	}

}
