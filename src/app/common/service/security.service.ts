import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Advert } from '../model/advert.model';
import { Observable } from 'rxjs';
import { SecurityUpdate, SecurityRequest, SecurityDetail } from '../model/security.model';

@Injectable({
	providedIn: 'root'
})
export class SecurityService {

	private securityUrl = 'http://localhost:8080/api/security';

	constructor(private http: HttpClient) { }

	createHashFromAdvert(advert: Advert): Observable<SecurityDetail> {
		return this.http.post<SecurityDetail>(`${this.securityUrl}/create`, advert);
	}

	createHashForUpdate(securityUpdate: SecurityUpdate): Observable<SecurityDetail> {
		return this.http.post<SecurityDetail>(`${this.securityUrl}/update`, securityUpdate);
	}

	checkCode(securityRequest: SecurityRequest): Observable<boolean> {
		return this.http.post<boolean>(`${this.securityUrl}/check`, securityRequest);
	}
}
