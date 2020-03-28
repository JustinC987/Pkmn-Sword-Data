
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
// tslint:disable: indent
import { Observable } from 'rxjs';
import { HandlerService } from '../../handler.service';
import {UncaughtPokemon} from '../../models/uncaught-pokemon';
import { AuthService } from 'src/app/auth.service';

@Injectable({
	providedIn: 'root'
})
export class UncaughtPokemonService {
    private uncaughtPokemonUrl = "http://localhost:3000/uncaughtPokemon";

	constructor(private http: HttpClient, public handler: HandlerService, public authService: AuthService) {}
	
	//Create

	public addPokemon(pkmn: UncaughtPokemon): Observable<Object> {
		this.handler.showLoader();
		return this.http.post(this.uncaughtPokemonUrl, pkmn).pipe(
			tap((result) => {
				if (result) {
					this.handler.hideLoader();
				}
			}),
			catchError(this.handler.error<UncaughtPokemon>('UncaughtPokemonService::post'))
		);
	}

	//Read

    public getUncaughtPokemon(params: any): Observable<UncaughtPokemon[]> {
		this.handler.showBackgroundLoader();

		return this.http
			.get<UncaughtPokemon[]>(this.uncaughtPokemonUrl, {
				headers: this.authService.getHeaders(),
			})
			.pipe(
				map((results) => {

				// Array-ify
				if (!(results instanceof Array)) {
					results = [ results ];
				}
				if(results) {
					this.handler.hideBackgroundLoader();
					return results;
				}

				}),
				catchError(this.handler.error<UncaughtPokemon[]>('UncaughtPokemonService::getUncaughtPokemon'))
			);
	}

	// Update

	public update(pkmnId: number, data: UncaughtPokemon): Observable<any> {
		this.handler.showLoader();
		return this.http
			.put(`${this.uncaughtPokemonUrl}/${pkmnId}`, data, {
				headers: this.authService.getHeaders(),
			})
			.pipe(
				tap((result) => {
					if(result) {
						this.handler.hideLoader();
					}
				}),
				catchError(
					this.handler.error<UncaughtPokemon>(
						'UserService::update',
						`PUT user (#${pkmnId}) failed.`
					)
				)
			);
	}

	// Delete
	
	public deletePokemon(pkmnId: any): Observable<any> {
		this.handler.showLoader();
		return this.http.request('delete', this.uncaughtPokemonUrl +  '/' +  pkmnId).pipe(
			tap((result) => {
				if(result) {
					this.handler.hideLoader();
				}
			}),
			catchError(this.handler.error<number>('StockService::delete', `DELETE stock (#${pkmnId}) failed.`))
		);
	}
}