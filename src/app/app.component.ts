import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './common/service/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'bazarik-fe';

	pageLoaded = false;

	constructor(
		private http: HttpClient
	) {}

	ngOnInit(): void {

		this.http.get('http://localhost:8080/api/categories').subscribe(Response => {
			if(Response) {
				this.pageLoaded = true;
				return;
			}
		});

	}


}
