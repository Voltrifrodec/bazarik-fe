import { Injectable } from '@angular/core';
import { Advert, AdvertResponse } from '../model/advert.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '../model/pagination.model';

@Injectable({
	providedIn: 'root'
})
export class AdvertService {

	private apiUrl = `http://localhost:8080/api`;
	private advertsUrl = 'http://localhost:8080/api/adverts';

	constructor(private http: HttpClient) {}

	getAllAdverts(
		pagination: Pagination = {
			page: 0,
			size: 10,
			filter: {
				query: ''
			}
		}
	): Observable<AdvertResponse> {
		const params = new HttpParams().appendAll({
			page: pagination.page,
			size: pagination.size,
			query: pagination.filter.query
		});
		return this.http.get<AdvertResponse>(this.advertsUrl, {params});
	}

	getAllAdvertsByCategoryId(
		categoryId: number,
		pagination: Pagination = {
			page: 0,
			size: 10,
			filter: {
				query: ''
			}
		}
	): Observable<AdvertResponse> {
		const params = new HttpParams().appendAll({
			page: pagination.page,
			size: pagination.size,
			query: pagination.filter.query
		});
		return this.http.get<AdvertResponse>(`${this.apiUrl}/categories/${categoryId}/adverts`, {params});
	}


	getRecentAdverts(count: number): Observable<Advert[]> {
		return this.http.get<Advert[]>(`${this.advertsUrl}/recent/${count}`);
	}

	getAllAdvertsByQuery(query: string): Observable<Advert[]> {
		return this.http.get<Advert[]>(`${this.apiUrl}/search/${query}`);
	}

	getNumberOfAdvertsInCategoryByCategoryId(categoryId: number): Observable<number> {
		return this.http.get<number>(`${this.apiUrl}/categories/${categoryId}/adverts/count`);
	}

	getAllAdvertsBySubcategoryId(subcategoryId: number): Observable<Advert[]> {
		return this.http.get<Advert[]>(`${this.apiUrl}/subcategories/${subcategoryId}/adverts`);
	}

	getAllAdvertsBySubsubcategoryId(subsubcategoryId: number): Observable<Advert[]> {
		return this.http.get<Advert[]>(`${this.apiUrl}/subsubcategories/${subsubcategoryId}/adverts`);
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
