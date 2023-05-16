import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Auth } from '../model/auth.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private tokenUrl = 'http://localhost:8080/api/token';

	constructor(private http: HttpClient) { }

	login(user: Auth): Observable<any> {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + btoa(user.username + ':' + user.password)
		});
		return this.http.post<any>(this.tokenUrl, null, { headers, observe: 'response' }).pipe(
			tap((response: any) => {
				const authToken = response.headers.get('Authorization'); // Tu to už nevypíše správne (null)
				this.setToken(authToken);
			})
		);
	}

	logout(): Observable<any> {
		const headers = new HttpHeaders({
			'Authorization': '' + this.getToken()
		});
		return this.http.delete(this.tokenUrl, { headers });
	}

	isLogged(): boolean {
		return this.getToken() !== null;
	}

	setToken(token: string): void {
		localStorage.setItem('token', token);
	}

	getToken(): string | null {
		const item = localStorage.getItem('token');
		return item;
	}

}
