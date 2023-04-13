import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Advert } from '../model/advert.model';
import { Image } from '../model/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
	// private apiUrl = `http://localhost:8080/api`;
	private imagesUrl = 'http://localhost:8080/api/images';
	
	constructor(private http: HttpClient) { }

	uploadImage(file: File): Observable<number> {
		const formData = new FormData();
		formData.append('file', file);
		
		return this.http.post<number>(`${this.imagesUrl}/upload`, formData);
	}

	getImageById(imageId: number): Observable<Image> {
		return this.http.get<Image>(`${this.imagesUrl}/${imageId}`);
	}

}
