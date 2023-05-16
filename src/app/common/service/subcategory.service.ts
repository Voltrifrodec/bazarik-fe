import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategory } from '../model/subcategory.model';
import { Subsubcategory } from '../model/subsubcategory.model';

@Injectable({
	providedIn: 'root'
})
export class SubcategoryService {

	private subcategoryUrl = 'http://localhost:8080/api/subcategories';

	constructor(private http: HttpClient) { }

	getAllSubcategories(): Observable<Subcategory[]> {
		return this.http.get<Subcategory[]>(this.subcategoryUrl);
	}

	getSubsubcategoriesBySubcategoryId(subcategoryId: number): Observable<Subsubcategory[]> {
		return this.http.get<Subsubcategory[]>(`${this.subcategoryUrl}/${subcategoryId}/subsubcategories`);
	}

	getSubcategoryById(subcategoryId: number): Observable<Subcategory> {
		return this.http.get<Subcategory>(`${this.subcategoryUrl}/${subcategoryId}`);
	}

	createSubcategory(subcategory: Subcategory): Observable<number> {
		return this.http.post<number>(this.subcategoryUrl, subcategory);
	}

	updateSubcategory(subcategory: Subcategory): Observable<Subcategory> {
		return this.http.put<Subcategory>(`${this.subcategoryUrl}/${subcategory.id}`, subcategory);
	}

	deleteSubcategory(subcategoryId: number): Observable<void> {
		return this.http.delete<void>(`${this.subcategoryUrl}/${subcategoryId}`);
	}
}
