import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Advert } from 'src/app/common/model/advert.model';
import { Category } from 'src/app/common/model/category.model';
import { Country } from 'src/app/common/model/country.model';
import { Currency } from 'src/app/common/model/currency.model';
import { District } from 'src/app/common/model/district.model';
import { Region } from 'src/app/common/model/region.model';
import { Subcategory } from 'src/app/common/model/subcategory.model';
import { Subsubcategory } from 'src/app/common/model/subsubcategory.model';

@Component({
  selector: 'app-advert-form',
  templateUrl: './advert-form.component.html',
  styleUrls: ['./advert-form.component.css']
})
export class AdvertFormComponent {
	advertForm: FormGroup;

	@Input()
	set advertData(advert: Advert | undefined) {
		if (advert) {
			this.advertForm.setValue(advert);
		}
	}

	@Input()
	categories?: Category[];

	@Input()
	subcategories?: Subcategory[];
	
	@Input()
	subsubcategories?: Subsubcategory[];
	
	@Input()
	countries?: Country[];

	@Input()
	districts?: District[];
	
	@Input()
	regions?: Region[];

	@Input()
	currencies?: Currency[];
	// currencies: Array<Currency> = [{id: 0, symbol: '€', name: 'EURO'}];
	currency: Currency = {id: 0, symbol: '€', name: 'EURO'};

	@Output()
	formCancel = new EventEmitter<void>();

	@Output()
	formCreate = new EventEmitter<Advert>();

	@Output()
	formUpdate = new EventEmitter<Advert>();

	constructor(private router: Router) {
		this.advertForm = new FormGroup({
			id: new FormControl(null, [Validators.required]),
			name: new FormControl(null, [Validators.required]),
			description: new FormControl(null, [Validators.required]),
			keywords: new FormControl(null, [Validators.required]),

			priceEur: new FormControl(null, [Validators.required]),
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
		/*
		this.categories.push(
			{ id: 0, name: "Počítače, notebooky" },
			{ id: 1, name: "Náradie" },
			{ id: 2, name: "Stavba" },
			{ id: 3, name: "Ovocie" },
		);

		this.subcategories.push(
			{ id: 0, name: "Komponenty", category: this.categories[0] },
			{ id: 1, name: "Notebooky", category: this.categories[0] },
			{ id: 2, name: "Počítače", category: this.categories[0] }
		)
		
		this.subsubcategories.push(
			{ id: 0, name: "Pamäť RAM", subcategory: this.subcategories[0] }
		)

		this.countries.push(
			{ id: 0, name: "Slovakia"}
		)

		this.regions.push(
			{ id: 0, name: "Banskobystrický", country: this.countries[0] }
		)

		this.districts.push(
			{ id: 0, name: "Banská Bystrica", postcode: "974 01", region: this.regions[0] }
		)
		*/
	}

	saveAdvert(): void {
		// https://stackoverflow.com/questions/51578629/how-can-i-put-an-input-in-the-alert-box
		let confirmationNumber = this.getRandomInt(10,99);
		
		let userResponse = window.prompt(`Pre overenie inzerátu zadajte číslo: ${confirmationNumber}`);
		
		// console.log(userResponse);

		if (userResponse == null) { return; }
		
		if (Number(userResponse) === confirmationNumber) {
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
}
