import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Advert } from '../model/advert.model';
import { Observable } from 'rxjs';
import { SecurityUpdate } from '../model/security-update.model';
import { SecurityRequest } from '../model/security-request.model';

@Injectable({
	providedIn: 'root'
})
export class SecurityService {

	private securityUrl = 'http://localhost:8080/api/security';

	constructor(private http: HttpClient) { }

	createHashFromAdvert(advert: Advert): Observable<string> {
		return this.http.post<string>(`${this.securityUrl}/create`, advert);
	}

	createHashForUpdate(securityUpdate: SecurityUpdate): Observable<string> {
		return this.http.post<string>(`${this.securityUrl}/update`, securityUpdate);
	}

	checkCode(securityRequest: SecurityRequest): Observable<boolean> {
		return this.http.post<boolean>(`${this.securityUrl}/check`, securityRequest);
	}
}
