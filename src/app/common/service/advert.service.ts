import { Injectable } from '@angular/core';
import { Advert } from '../model/advert.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AdvertService {
	
	private apiUrl = `http://localhost:8080/api`;
	private advertsUrl = 'http://localhost:8080/api/adverts';
	
	constructor(private http: HttpClient) { }

	getAllAdverts(): Observable<Advert[]> {
		return this.http.get<Advert[]>(this.advertsUrl);
	}

	getAllAdvertsByCategoryId(categoryId: number): Observable<Advert[]> {
		return this.http.get<Advert[]>(`${this.apiUrl}/categories/${categoryId}/adverts`);
	}

	getAllAdvertsBySubcategoryId(subcategoryId: number): Observable<Advert[]> {
		return this.http.get<Advert[]>(`${this.apiUrl}/categories/${subcategoryId}/adverts`);
	}

	getAllAdvertsBySubsubcategoryId(subsubcategoryId: number): Observable<Advert[]> {
		return this.http.get<Advert[]>(`${this.apiUrl}/categories/${subsubcategoryId}/adverts`);
	}

	getAdvertById(advertId: string): Observable<Advert> {
		return this.http.get<Advert>(`${this.advertsUrl}/${advertId}`);
	}

	createAdvert(advert: Advert): Observable<string> {
		return this.http.post<string>(this.advertsUrl, advert);
	}

	updateAdvert(advert: Advert): Observable<Advert> {
		return this.http.put<Advert>(`${this.advertsUrl}/${advert.id}`, advert);
	}

	deleteAdvert(advertId: string): Observable<void> {
		return this.http.delete<void>(`${this.advertsUrl}/${advertId}`);
	}
}