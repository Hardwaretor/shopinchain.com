import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Product } from '../models/product';


@Injectable({ providedIn: 'root' })
export class AccountService {


    private productSubject: BehaviorSubject<Product>;
    public product: Observable<Product>;



    constructor(
        private router: Router,
        private http: HttpClient
    ) {


        this.productSubject = new BehaviorSubject<Product>(JSON.parse(localStorage.getItem('product')));
        this.product = this.productSubject.asObservable();

    }


    public get productsValue(): Product {
        return this.productSubject.value;
    }


    getAllproducts() {
        return this.http.get<Product>(`${environment.apiUrl}/products`, {})
        .pipe(tap(ref => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.productSubject.next(ref);
            return ref;
        }))
    }





}