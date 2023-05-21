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
				const authToken = response.headers.get('Authorization');
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

	validateToken(): Observable<boolean> {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': '' + this.getToken()
		});
		return this.http.post<boolean>(`${this.tokenUrl}/check`, null, { headers });
	}

	/**DEPRECATED */
	isLogged(): null | undefined | void {
		console.error('THIS METHOD IS DEPRACTED!');
		// return this.getToken() !== null;
	}

	isTokenInLocalStorage(): boolean {
		return localStorage.getItem('token') ? true : false;
	}

	setToken(token: string): void {
		localStorage.setItem('token', token);
	}

	getToken(): string | null {
		return localStorage.getItem('token');
	}

	removeToken() {
		localStorage.removeItem('token');
	}

}
