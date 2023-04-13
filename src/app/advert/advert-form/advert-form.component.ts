import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Advert } from 'src/app/common/model/advert.model';
import { Category } from 'src/app/common/model/category.model';
import { Country } from 'src/app/common/model/country.model';
import { Currency } from 'src/app/common/model/currency.model';
import { District } from 'src/app/common/model/district.model';
import { Image } from 'src/app/common/model/image.model';
import { Region } from 'src/app/common/model/region.model';
import { Subcategory } from 'src/app/common/model/subcategory.model';
import { Subsubcategory } from 'src/app/common/model/subsubcategory.model';
import { AdvertService } from 'src/app/common/service/advert.service';
import { CategoryService } from 'src/app/common/service/category.service';
import { ImageService } from 'src/app/common/service/image.service';
import { RegionService } from 'src/app/common/service/region.service';
import { SubcategoryService } from 'src/app/common/service/subcategory.service';
import { SubsubcategoryService } from 'src/app/common/service/subsubcategory.service';

@UntilDestroy()
@Component({
	selector: 'app-advert-form',
	templateUrl: './advert-form.component.html',
	styleUrls: ['./advert-form.component.css']
})
export class AdvertFormComponent implements OnInit, OnDestroy {

	title = 'Nový inzerát';

	advertForm: FormGroup;

	@Input()
	set advertData(advert: Advert | undefined) {
		if (advert) {
			this.advertForm.setValue(advert);
		}
	}

	categories?: Category[];
	subcategories?: Subcategory[];
	subsubcategories?: Subsubcategory[];
	countries?: Country[];
	regions?: Region[];
	districts?: District[];
	currencies?: Currency[];

	@Output()
	formCancel = new EventEmitter<void>();

	@Output()
	formCreate = new EventEmitter<Advert>();

	@Output()
	formUpdate = new EventEmitter<Advert>();

	constructor(
		private router: Router,
		private categoryService: CategoryService,
		private subcategoryService: SubcategoryService,
		private subsubcategoryService: SubsubcategoryService,
		private regionService: RegionService,
		private imageService: ImageService,
		private advertService: AdvertService
	) {
		this.advertForm = new FormGroup({
			id: new FormControl(null, []),
			name: new FormControl(null, [Validators.required]),
			description: new FormControl(null, []),
			keywords: new FormControl(null, []),

			priceEur: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(50000)]),
			currency: new FormControl(null, []),
			fixedPrice: new FormControl(true, [Validators.required]),

			category: new FormControl(null, [Validators.required]),
			subcategory: new FormControl(null, []),
			subsubcategory: new FormControl(null, []),

			contact: new FormControl(null, [Validators.required, Validators.email]),

			region: new FormControl(null, [Validators.required]),
			district: new FormControl(null, [Validators.required]),

			image: new FormControl(null, [])
		})
	}

	ngOnDestroy(): void {
		this.saveToLocalStorage();
	}

	ngOnInit(): void {
		this.categoryService.getAllCategories().pipe(untilDestroyed(this)).subscribe((categories: Category[]) => {
			this.categories = categories;
		});

		this.regionService.getAllRegions().pipe(untilDestroyed(this)).subscribe((regions: Region[]) => {
			this.regions = regions;
		});

		this.loadFromLocalStorage()
	}

	loadSubcategories(): void {
		let categoryId = Number(this.advertForm.controls['category'].value);

		this.categoryService.getSubcategoriesByCategoryId(categoryId).pipe(untilDestroyed(this))
			.subscribe((subcategories: Subcategory[]) => {
				this.subcategories = subcategories;
			})
	}

	loadSubsubcategories(): void {
		let subcategoryId = Number(this.advertForm.controls['subcategory'].value);

		this.subcategoryService.getSubsubcategoriesBySubcategoryId(subcategoryId).pipe(untilDestroyed(this))
			.subscribe((subsubcategories: Subsubcategory[]) => {
				this.subsubcategories = subsubcategories;
			})
	}

	loadDistricts(): void {
		let regionId = Number(this.advertForm.controls['region'].value);
		
		this.regionService.getAllDistrictsByRegionId(regionId).pipe(untilDestroyed(this))
			.subscribe((districts: District[]) => {
				this.districts = districts;
			})
	}

	loadCities(): void {
		// TODO: Implementovať obec
		/* 
		let regionId = Number(this.advertForm.controls['region'].value);
		
		this.regionService.getAllDistrictsByRegionId(regionId).pipe(untilDestroyed(this))
			.subscribe((districts: District[]) => {
			this.districts = districts;
		})
		*/
	}

	checkWhichFormControlIsInvalid(): void {
		if (this.advertForm.invalid) {
			const invalid = [];
	        const controls = this.advertForm.controls;
	        for (const name in controls) {
	            if (controls[name].invalid) {
	                invalid.push(name);
	            }
	        }
	        console.log(invalid);
			return;
		}
	}

	saveAdvert(): void {
		// https://stackoverflow.com/questions/51578629/how-can-i-put-an-input-in-the-alert-box
		let confirmationNumber = this.getRandomInt(10, 99);

		let userResponse = window.prompt(`Pre overenie inzerátu zadajte číslo: ${confirmationNumber}`);

		if (userResponse == null) return;
		if (Number(userResponse) !== confirmationNumber) {
			window.alert("Overenie nebolo úspešné.");
			this.saveAdvert();
		}

		let advert = this.prepareAdvert();

		let fileElement = document.querySelector('#file') as HTMLInputElement;
		let files = fileElement.files as FileList | undefined;
		let file = files![0] as File;

		if (! file) {
			advert.imageId = 1;
			this.advertService.createAdvert(advert).pipe(untilDestroyed(this)).subscribe((advertId: string) => {
				this.redirectToHomePage(advertId);
			}, (error: Error) => {
				console.error(error);
			})
		}

		if (file) {
			console.log(file);
			this.imageService.uploadImage(file).pipe(untilDestroyed(this)).subscribe((imageId: number) => {
				if (imageId) {
					advert.imageId = imageId;

					this.advertService.createAdvert(advert).pipe(untilDestroyed(this)).subscribe((advertId: string) => {
						this.redirectToHomePage(advertId);
					}, (error: Error) => {
						console.error(error);
					})
				}
			})
		}
	}

	private redirectToHomePage(advertId?: string): void {
		window.confirm("Inzerát bol úspešne pridaný.\nBudete presmerovaný na stránku inzerátu.");
		window.scrollTo(0, 0);

		this.router.navigate([`/advert/${advertId}`]);
		
		this.clearLocalStorage()
	}

	private prepareAdvert(): any {
		return {
			name: this.advertForm.controls['name'].value,
			description: this.advertForm.controls['description'].value,
			keywords: this.advertForm.controls['keywords'].value,

			priceEur: this.advertForm.controls['priceEur'].value,
			fixedPrice: this.advertForm.controls['fixedPrice'].value,
			currencyId: this.advertForm.controls['currency'].value,

			categoryId: this.advertForm.controls['category'].value,
			subcategoryId: this.advertForm.controls['subcategory'].value,
			subsubcategoryId: this.advertForm.controls['subsubcategory'].value,

			contactEmail: this.advertForm.controls['contact'].value,

			districtId: this.advertForm.controls['district'].value,

			imageId: this.advertForm.controls['image'].value,
		}
	}


	leaveDialog(): void {
		let userResponse = window.confirm(
			`Naozaj chcete odísť z tejto stránky?\nÚdaje budú obnovené po následujúcom vstupe na stránku.\nBudete presmerovaný na hlavnú stránku.`
		);

		if (userResponse) {
			this.saveToLocalStorage();
			this.router.navigate(['/'])
			window.scrollTo(0, 0);
		}
	}
	
	saveToLocalStorage(): void {
		let advert = this.prepareAdvert();

		for (const [key, value] of Object.entries(advert)) {
			if (String(value!).trim() !== null) {
				localStorage.setItem(key, String(value));
			}
		}
	}

	loadFromLocalStorage(): void {
		for (let i = 0; localStorage.key(i) != null; i++) {
			let key: string = localStorage.key(i)!;
			if (! key) continue;

			let value: string = localStorage.getItem(key!)!;
			if (! value) continue;

			// console.log(key, value);

			if (! this.advertForm.controls[key]) continue;

			this.advertForm.controls[key].setValue(value);
		}
	}

	clearLocalStorage(): void {
		localStorage.clear();
	}


	
	getRandomInt(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
	}
}
