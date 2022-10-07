import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Product } from 'src/app/models/product/product';

export interface Links {
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private REST_API_SERVER = "http://localhost:3000";
  private REST_API_SERVER = "/api/products";

  public first: string = "";
  public prev: string = "";
  public next: string = "";
  public last: string = "";

  //constructor() {}
  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  // getProducts() {
  //   return [];
  // }

  // getProducts(): Observable<any> {
  //   return of([]);
  // }

  // getProducts(): Observable<any> {
  //   return of([
  //     { id: 1, name: 'name 1', description: 'description 1' },
  //     { id: 2, name: 'name 2', description: 'description 2' },
  //     { id: 3, name: 'name 3', description: 'description 3' },
  //   ]);
  // }

  public getProducts(): Observable<any> {
    // Add safe, URL encoded_page parameter 
    const options = { params: new HttpParams({fromString: "_page=1&_limit=20"}) };

    // return this.httpClient.get('http://localhost:3000/products');
    return this.httpClient.get(this.REST_API_SERVER, options).pipe(retry(3), catchError(this.handleError));
  }

  public sendGetRequest()  {
    // failed test
    // return this.httpClient.get("http://localhost:3001");

    // Add safe, URL encoded_page parameter 
    // const options = { params: new HttpParams({fromString: "_page=1&_limit=20"}) };
    // const options = { params: new HttpParams({fromString: '_page=1&_limit=20'}), observe: 'response' };

    // passed test
    // return this.httpClient.get(this.REST_API_SERVER, options).pipe(retry(3), catchError(this.handleError));

    // Add safe, URL encoded _page and _limit parameters 
    // return this.httpClient.get(this.REST_API_SERVER, { params: new HttpParams({fromString: "_page=1&_limit=20"}), observe: "response" }).pipe(retry(3), catchError(this.handleError), tap(res => {
    //   console.log("linkHeader = " + res.headers.get('Link'));
    //   //this.parseLinkHeader(res.headers.get('Link'));

    //   // const links = parseLinkHeader(res.headers.get('Link'));
    //   // console.log(links);
    // }));
    // return this.httpClient.get(this.REST_API_SERVER, { params: new HttpParams({fromString: '_page=1&_limit=20'}), observe: 'response' } ).pipe(retry(3), catchError(this.handleError));
    return this.httpClient.get<Product[]>(this.REST_API_SERVER, { params: new HttpParams({fromString: '_page=1&_limit=20'}), observe: 'response' } ).pipe(retry(3), catchError(this.handleError), tap(res => {
      // console.log("linkHeader = " + res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));
      // console.log("links[first] = " + this.first);
      // console.log("links[last] = " + this.last);
      // console.log("links[prev] = " + this.prev);
      // console.log("links[next] = " + this.next);
    }));
  }

  public sendGetRequestToUrl(url: string) {
    return this.httpClient.get<Product[]>(url, { observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));
    }));
  }

  parseLinkHeader(header: string | null) {
    if (header && header.length == 0) {
      return;
    }
    let parts = header ? header.split(',') : [];
    var links: any = {};
    parts.forEach( (p: string) => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });
    this.first = links["first"];
    this.last = links["last"];
    this.prev = links["prev"];
    this.next = links["next"]; 
  }
}
