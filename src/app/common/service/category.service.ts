import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

	private apiUrl = `http://localhost:8080/api`;
	private categoryUrl = 'http://localhost:8080/api/categories';
	
	constructor(private http: HttpClient) { }

	getAllCategoryies(): Observable<Category[]> {
		return this.http.get<Category[]>(this.categoryUrl);
	}

	getCategoryById(categoryId: number): Observable<Category> {
		return this.http.get<Category>(`${this.categoryUrl}/${categoryId}`);
	}

	createCategory(category: Category): Observable<number> {
		return this.http.post<number>(this.categoryUrl, category);
	}

	updateCategory(category: Category): Observable<Category> {
		return this.http.put<Category>(`${this.categoryUrl}/${category.id}`, category);
	}

	deleteCategory(categoryId: number): Observable<void> {
		return this.http.delete<void>(`${this.categoryUrl}/${categoryId}`);
	}
}
