import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class BeersService {
    
    constructor(private httpService: HttpClient) {}

    getBeers() {
        const beersURL = 'https://api.punkapi.com/v2/beers/';
        return this.httpService.get(beersURL)
    }
}