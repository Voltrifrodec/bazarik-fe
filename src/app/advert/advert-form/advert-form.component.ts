import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastService } from 'angular-toastify';
import { Advert } from 'src/app/common/model/advert.model';
import { Category } from 'src/app/common/model/category.model';
import { Country } from 'src/app/common/model/country.model';
import { Currency } from 'src/app/common/model/currency.model';
import { District } from 'src/app/common/model/district.model';
import { Region } from 'src/app/common/model/region.model';
import { SecurityAction } from 'src/app/common/model/security.model';
import { Subcategory } from 'src/app/common/model/subcategory.model';
import { Subsubcategory } from 'src/app/common/model/subsubcategory.model';
import { AdvertService } from 'src/app/common/service/advert.service';
import { CategoryService } from 'src/app/common/service/category.service';
import { CurrencyService } from 'src/app/common/service/currency.service';
import { ImageService } from 'src/app/common/service/image.service';
import { RegionService } from 'src/app/common/service/region.service';
import { SecurityService } from 'src/app/common/service/security.service';
import { SubcategoryService } from 'src/app/common/service/subcategory.service';
import { SubsubcategoryService } from 'src/app/common/service/subsubcategory.service';

@UntilDestroy()
@Component({
	selector: 'app-advert-form',
	templateUrl: './advert-form.component.html',
	styleUrls: ['./advert-form.component.css']
})
export class AdvertFormComponent implements OnInit {

	descriptionCharacterCount: number = 0;
	maximumDescriptionCharacterCount: number = 1024;

	nameCharacterCount = 0;
	maximumNameCharacterCount = 127;

	fileSizeMB = 0;
	maximumFileSizeMB = 10;

	maximumPriceEur = 50000;

	advertId: string = "";
	advertForm: FormGroup;

	@Input()
	set advertData(advert: Advert | undefined) {
		if (advert) {
			this.advertForm.setValue(advert);
		}
	}

	private advert?: Advert;
	private imageId?: number;

	@Input()
	formCreate = new EventEmitter<Advert>();

	@Output()
	formCancel = new EventEmitter<void>();

	@Input()
	clearForm = new EventEmitter<void>();

	@Output()
	action: SecurityAction = {
		action: 'create'
	}

	@Output()
	sendMessage = '';

	send(): void {
		this.sendMessage = 'send';
	}

	categories?: Category[];
	subcategories?: Subcategory[];
	subsubcategories?: Subsubcategory[];
	countries?: Country[];
	regions?: Region[];
	districts?: District[];
	currencies?: Currency[];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private categoryService: CategoryService,
		private subcategoryService: SubcategoryService,
		private subsubcategoryService: SubsubcategoryService,
		private regionService: RegionService,
		private imageService: ImageService,
		private advertService: AdvertService,
		private securityService: SecurityService,
		private toastService: ToastService,
		private currencyService: CurrencyService
	) {
		this.advertForm = new FormGroup({
			id: new FormControl(null, []),
			name: new FormControl(null, [Validators.required, Validators.maxLength(this.maximumNameCharacterCount)]),
			description: new FormControl(null, [Validators.maxLength(this.maximumDescriptionCharacterCount)]),
			keywords: new FormControl(null, []),

			priceEur: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(this.maximumPriceEur)]),
			currency: new FormControl(null, []),
			fixedPrice: new FormControl(true, [Validators.required]),

			category: new FormControl(null, [Validators.required]),
			subcategory: new FormControl(null, []),
			subsubcategory: new FormControl(null, []),

			contactEmail: new FormControl(null, [Validators.required, Validators.email]),

			region: new FormControl(null, [Validators.required]),
			district: new FormControl(null, [Validators.required]),

			image: new FormControl(null, [])
		});

		if (this.router.url.includes(`/advert/edit`)) {
			this.action.action = 'update';
		}

		if (this.router.url.includes('/advert/new')) {
			this.action.action = 'create';			
		}
		
		let advertId = this.route.snapshot.params['advertId'];
		if (advertId) this.advertId = advertId;
	}

	ngOnInit(): void {
		this.getAllCategories();

		this.getRegions();

		this.getCurrencies();

		
		this.getAdvert();
	}

	getAllCategories(): void {
		this.categoryService.getAllCategories().pipe(untilDestroyed(this)).subscribe((categories: Category[]) => {
			this.categories = categories;
			this.loadSubcategories();
		});
	}

	getRegions(): void {
		this.regionService.getAllRegions().pipe(untilDestroyed(this)).subscribe((regions: Region[]) => {
			this.regions = regions;
			this.loadDistricts();
		});
	}

	getCurrencies(): void {
		this.currencyService.getAllCurrencies().pipe(untilDestroyed(this)).subscribe((currencies: Currency[]) => {
			this.currencies = currencies;
			this.advertForm.controls['currency'].setValue(this.currencies?.at(0)?.id);
		});
	}

	loadSubcategories(): void {
		let categoryId = Number(this.advertForm.controls['category'].value);
		if (! categoryId) return;

		this.categoryService.getSubcategoriesByCategoryId(categoryId).subscribe((subcategories: Subcategory[]) => {
			this.subcategories = subcategories;
			this.loadSubsubcategories();
		});
	}

	loadSubsubcategories(): void {
		let subcategoryId = Number(this.advertForm.controls['subcategory'].value);
		if (! subcategoryId) return;

		this.subcategoryService.getSubsubcategoriesBySubcategoryId(subcategoryId)
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
			return;
		}
	}

	getAdvert() {
		if (! this.advertId) return;
		
		this.advertService.getAdvertById(this.advertId).pipe(untilDestroyed(this)).subscribe((advert: Advert) => {
			this.advert = advert;
			this.advertForm.controls['id'].setValue(advert.id);
			this.advertForm.controls['name'].setValue(advert.name);
			this.advertForm.controls['description'].setValue(advert.description);
			this.advertForm.controls['keywords'].setValue(advert.keywords);

			this.advertForm.controls['priceEur'].setValue(advert.priceEur);
			this.advertForm.controls['currency'].setValue(advert.currency.id);
			this.advertForm.controls['fixedPrice'].setValue(advert.fixedPrice);

			this.advertForm.controls['category'].setValue(advert.category.id);

			this.loadSubcategories();
			this.advertForm.controls['subcategory'].setValue(advert.subcategory?.id!);

			this.loadSubsubcategories();
			this.advertForm.controls['subsubcategory'].setValue(advert.subsubcategory?.id);

			this.advertForm.controls['contactEmail'].setValue(advert.contact.email);

			this.advertForm.controls['region'].setValue(advert.district.region.id);
			this.loadDistricts();
			this.advertForm.controls['district'].setValue(advert.district.id);

			this.imageId = advert.image.id;

			this.countChars();
		});
	}

	prepareAdvert(): any {
		return {
			id: this.advertForm.controls['id'].value,
			name: this.advertForm.controls['name'].value,
			description: this.advertForm.controls['description'].value,
			keywords: this.advertForm.controls['keywords'].value,

			priceEur: this.advertForm.controls['priceEur'].value,
			fixedPrice: this.advertForm.controls['fixedPrice'].value,
			currencyId: this.currencies?.at(0)?.id || this.advertForm.controls['currency'].value,

			categoryId: this.advertForm.controls['category'].value,
			subcategoryId: this.advertForm.controls['subcategory'].value,
			subsubcategoryId: this.advertForm.controls['subsubcategory'].value,

			contactEmail: this.advertForm.controls['contactEmail'].value,

			regionId: this.advertForm.controls['region'].value,
			districtId: this.advertForm.controls['district'].value,

			imageId: this.imageId,
		}
	}


	leaveDialog(): void {
		let userResponse = window.confirm(
			`Naozaj chcete odísť z tejto stránky?\nBudete presmerovaný na hlavnú stránku.`
		);

		if (userResponse) {
			this.router.navigate(['/'])
			window.scrollTo(0, 0);
		}
	}

	countChars(): void {
		this.descriptionCharacterCount = this.advertForm.controls['description'].value?.length | 0;
		this.nameCharacterCount = this.advertForm.controls['name'].value?.length | 0;
	}

	checkFileSize(): void {
		let fileElement = document.querySelector('#file') as HTMLInputElement;
		let files = fileElement.files as FileList | undefined;
		let file = files![0] as File;

		this.fileSizeMB = Number((file.size / 1024 / 1024).toFixed(1));

		this.advertForm.controls['image'].setErrors(
			(this.fileSizeMB > this.maximumFileSizeMB) ? {'maximumFileSize' : true} : null
		);
	}

	getRandomInt(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
	}
}
