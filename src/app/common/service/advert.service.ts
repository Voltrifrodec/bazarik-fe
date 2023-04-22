import { Injectable } from '@angular/core';
import { Advert } from '../model/advert.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AdvertResponse } from '../model/advert-response';
import { Pagination } from '../model/pagination';

@Injectable({
	providedIn: 'root'
})
export class AdvertService {
	
	private apiUrl = `http://localhost:8080/api`;
	private advertsUrl = 'http://localhost:8080/api/adverts';
	
	constructor(private http: HttpClient) { }

    getAdverts(categoryId: number, pagination: Pagination = { page: 0, size: 10, filter: { categoryId: 0 } }): Observable<AdvertResponse> {
        pagination.filter.categoryId = categoryId;

        const params = new HttpParams().appendAll({
            categoryId: pagination.filter.categoryId,
            page: pagination.page,
            size: pagination.size
        });

        return this.http.get<AdvertResponse>(this.advertsUrl, {params});
    }

	getAllAdverts(): Observable<Advert[]> {
		return this.http.get<Advert[]>(this.advertsUrl);
	}

	getAllAdvertsByQuery(query: string): Observable<Advert[]> {
		return this.http.get<Advert[]>(`${this.apiUrl}/search/${query}`);
	}

	getAllAdvertsByCategoryId(categoryId: number): Observable<Advert[]> {
		return this.http.get<Advert[]>(`${this.apiUrl}/categories/${categoryId}/adverts`);
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
