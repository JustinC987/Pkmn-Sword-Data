import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HandlerService } from '../app/handler.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	public cachedHeaders?: HttpHeaders;
	public registerUrl = 'http://localhost:4000/api/user';
	public loginUrl = 'http://localhost:4000/api/user/login';
	public authLink = 'http://localhost:4000/api/user/current';
	public localUserId: any;
	public localUserToken: any;
	public localUserEmail: any;
	public isLoggedIn: boolean;

	constructor(private http: HttpClient, private handler: HandlerService) {}

	public getHeaders(fresh: boolean = false): HttpHeaders {
		// Create headers

		if (this.localUserToken) {
			this.cachedHeaders = new HttpHeaders({
				'Content-Type': 'application/json'
			}).set('Authorization', 'Token ' + this.localUserToken);
		} else {
			this.cachedHeaders = new HttpHeaders({
				'Content-Type': 'application/json'
			});
		}

		return this.cachedHeaders;
	}
}