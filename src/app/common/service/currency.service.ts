import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';
import { Currency } from '../model/currency.model';

@Injectable({
	providedIn: 'root'
})
export class CurrencyService {

	private currencyUrl = 'http://localhost:8080/api/currencies';

	constructor(private http: HttpClient) { }

	getAllCurrencies(): Observable<Currency[]> {
		return this.http.get<Currency[]>(this.currencyUrl);
	}
}
