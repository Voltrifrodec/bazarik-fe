import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subsubcategory } from '../model/subsubcategory.model';

@Injectable({
	providedIn: 'root'
})
export class SubsubcategoryService {

	private subsubcategoryUrl = 'http://localhost:8080/api/subsubcategories';

	constructor(private http: HttpClient) { }

	getAllSubsubcategories(): Observable<Subsubcategory[]> {
		return this.http.get<Subsubcategory[]>(this.subsubcategoryUrl);
	}

	getSubsubcategoryById(subcategoryId: number): Observable<Subsubcategory> {
		return this.http.get<Subsubcategory>(`${this.subsubcategoryUrl}/${subcategoryId}`);
	}

	createSubsubcategory(subsubcategory: Subsubcategory): Observable<number> {
		return this.http.post<number>(this.subsubcategoryUrl, subsubcategory);
	}

	updateSubsubcategory(subsubcategory: Subsubcategory): Observable<Subsubcategory> {
		return this.http.put<Subsubcategory>(`${this.subsubcategoryUrl}/${subsubcategory.id}`, subsubcategory);
	}

	deleteSubsubcategory(subcategoryId: number): Observable<void> {
		return this.http.delete<void>(`${this.subsubcategoryUrl}/${subcategoryId}`);
	}
}
