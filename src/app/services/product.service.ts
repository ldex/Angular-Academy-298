import { Injectable } from '@angular/core';
import { Product } from '../products/product.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, delay, shareReplay, tap, map, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://storerestservice.azurewebsites.net/api/products/';
  products$: Observable<Product[]>;

  constructor(
    private http: HttpClient
  ) {
    this.initProducts();
  }

  getProductById(id: number): Observable<Product> {
    return this
            .products$
            .pipe(
              map(products => products.find(product => product.id == id))
            )
  }

  initProducts() {
    this.products$ = this
                      .http
                      .get<Product[]>(this.baseUrl)
                      .pipe(
                        delay(1500), // Fake delay just for demo!!!
                        tap(console.table),
                        shareReplay(), // cache the results
                        catchError(error => {
                          console.log(error);
                          return EMPTY;
                        })
                      );
  }
}