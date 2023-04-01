import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

	categories: Array<Category> = [];
	subcategories: Array<Subcategory> = [];
	subsubcategories: Array<Subsubcategory> = [];
	
	countries: Array<Country> = [];
	districts: Array<District> = [];
	regions: Array<Region> = [];

	currencies: Array<Currency> = [{id: 0, symbol: '€', name: 'EURO'}];
	currency: Currency = {id: 0, symbol: '€', name: 'EURO'};

	constructor(private router: Router) {
		this.advertForm = new FormGroup({
			id: new FormControl(null, [Validators.required]),
			name: new FormControl(null, [Validators.required]),
			description: new FormControl(null, [Validators.required]),

			category: new FormControl(null, [Validators.required]),
			subcategory: new FormControl(null, [Validators.required]),
			subsubcategory: new FormControl(null, [Validators.required]),

			region: new FormControl(null, [Validators.required]),
			district: new FormControl(null, [Validators.required]),
			keywords: new FormControl(null, [Validators.required]),
			price: new FormControl(null, [Validators.required]),
			currency: new FormControl(this.currencies[0], [Validators.required]),
			fixedPrice: new FormControl(null, [Validators.required]),

			image: new FormControl(null, [Validators.required])
		})

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
	}

	authorizeAdvert(): void {
		// https://stackoverflow.com/questions/51578629/how-can-i-put-an-input-in-the-alert-box
		let confirmationNumber = this.getRandomInt(1000,9999);
		
		let userResponse = window.prompt(`Pre overenie inzerátu zadajte číslo: ${confirmationNumber}`);

		if (!userResponse) { return; }
		
		if (Number(userResponse) === confirmationNumber) {
			window.confirm("Inzerát bol úspešne pridaný.");
			this.router.navigate([''])
		} else {
			window.alert("Overenie nebolo úspešné.");
			this.authorizeAdvert();
		}
	}

	getRandomInt(min:number, max:number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
	  }
}
