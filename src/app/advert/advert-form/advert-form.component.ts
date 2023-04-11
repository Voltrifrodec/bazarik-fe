import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Advert } from 'src/app/common/model/advert.model';
import { Category } from 'src/app/common/model/category.model';
import { Country } from 'src/app/common/model/country.model';
import { Currency } from 'src/app/common/model/currency.model';
import { District } from 'src/app/common/model/district.model';
import { Region } from 'src/app/common/model/region.model';
import { Subcategory } from 'src/app/common/model/subcategory.model';
import { Subsubcategory } from 'src/app/common/model/subsubcategory.model';
import { CategoryService } from 'src/app/common/service/category.service';
import { RegionService } from 'src/app/common/service/region.service';
import { SubcategoryService } from 'src/app/common/service/subcategory.service';
import { SubsubcategoryService } from 'src/app/common/service/subsubcategory.service';

@UntilDestroy()
@Component({
  selector: 'app-advert-form',
  templateUrl: './advert-form.component.html',
  styleUrls: ['./advert-form.component.css']
})
export class AdvertFormComponent implements OnInit, OnChanges, OnDestroy {

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
	currency: Currency = {id: 0, symbol: '€', name: 'EURO'};

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
		private regionService: RegionService
	) {
		this.advertForm = new FormGroup({
			id: new FormControl(null, [Validators.required]),
			name: new FormControl(null, [Validators.required]),
			description: new FormControl(null, [Validators.required]),
			keywords: new FormControl(null, [Validators.required]),

			priceEur: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(50000)]),
			currency: new FormControl(this.currency, [Validators.required]),
			fixedPrice: new FormControl(null, [Validators.required]),

			category: new FormControl(null, [Validators.required]),
			subcategory: new FormControl(null, []),
			subsubcategory: new FormControl(null, []),

			contact: new FormControl(null, [Validators.required, Validators.email]),

			region: new FormControl(null, [Validators.required]),
			district: new FormControl(null, [Validators.required]),

			image: new FormControl(null, [Validators.required])
		})
	}

	ngOnDestroy(): void {
		// TODO: Pridať ukladanie údajov do localStorage
		// FIX: TEST
		console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
	}

	ngOnInit(): void {
		this.categoryService.getAllCategories().pipe(untilDestroyed(this)).subscribe((categories: Category[]) => {
			this.categories = categories;
		});

		this.regionService.getAllRegions().pipe(untilDestroyed(this)).subscribe((regions: Region[]) => {
			this.regions = regions;
		});

		// TODO: Pridať načítavanie údajov z localStorage
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
		// console.log(categoryId.value);
		this.subcategoryService.getSubsubcategoriesBySubcategoryId(subcategoryId).pipe(untilDestroyed(this))
			.subscribe((subsubcategories: Subsubcategory[]) => {
			this.subsubcategories = subsubcategories;
		})
	}

	loadDistricts(): void {
		let regionId = Number(this.advertForm.controls['region'].value);
		console.log(regionId);
		this.regionService.getAllDistrictsByRegionId(regionId).pipe(untilDestroyed(this))
			.subscribe((districts: District[]) => {
			this.districts = districts;
		})
	}

	loadCities(): void {
		// TODO: Implementovať obec
		/* 
		let regionId = Number(this.advertForm.controls['region'].value);
		console.log(regionId);
		this.regionService.getAllDistrictsByRegionId(regionId).pipe(untilDestroyed(this))
			.subscribe((districts: District[]) => {
			this.districts = districts;
		})
		*/
	}

	saveAdvert(): void {
		// https://stackoverflow.com/questions/51578629/how-can-i-put-an-input-in-the-alert-box
		let confirmationNumber = this.getRandomInt(10,99);
		
		let userResponse = window.prompt(`Pre overenie inzerátu zadajte číslo: ${confirmationNumber}`);
		
		// console.log(userResponse);

		if (userResponse == null) { return; }
		
		if (Number(userResponse) === confirmationNumber) {
			
			// TODO: Poslať obrázok na upload, vráti ID
			// TODO: Alebo to spraviť cez Blob

			// TODO: Poslať inzerát na backend
			// TODO: Presmerovať používateľa na úspešne vytvorený inzerát
			window.confirm("Inzerát bol úspešne pridaný.");
			this.router.navigate(['/advert/1'])
			window.scrollTo(0,0);
		} else {
			window.alert("Overenie nebolo úspešné.");
			this.saveAdvert();
		}
	}

	private prepareAdvert(advertId?: string): Advert {
		return {
			id: advertId !== undefined ? advertId : '',
			name: this.advertForm.controls['name'].value,
			description: this.advertForm.controls['description'].value,
			keywords: this.advertForm.controls['keywords'].value,

			dateAdded: new Date(),
			dateModified: new Date(),

			priceEur: this.advertForm.controls['priceEur'].value,
			fixedPrice: this.advertForm.controls['fixedPrice'].value,
			currency: this.advertForm.controls['currency'].value,
			
			category: this.advertForm.controls['category'].value,
			subcategory: this.advertForm.controls['subcategory'].value,
			subsubcategory: this.advertForm.controls['subsubcategory'].value,

			contact: this.advertForm.controls['contact'].value,

			district: this.advertForm.controls['district'].value,

			image: this.advertForm.controls['image'].value,
		}
  	}

	getRandomInt(min:number, max:number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
	}

	leaveDialog(): void {
		let userResponse = window.confirm(`Naozaj chcete odísť z tejto stránky?\nÚdaje budú obnovené po následujúcom vstupe na stránku.`);
		
		if (userResponse) {
			this.router.navigate(['/'])
			window.scrollTo(0, 0);
		}
	}
}
