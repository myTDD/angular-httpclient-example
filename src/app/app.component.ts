import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //products$ = this.http.get('http://localhost:3000/api/products');
  products: any;
  title: string;
  
  constructor(private http: HttpClient) {
    this.title = "angular-httpclient-example";
  }

  ngOnInit(): void {
    // this generates a CORS issue because of different 'domains' (accessing localhost:3000 on localhost:4200)
    // this.http.get('http://localhost:3000/api/products')
    // .subscribe(products => {
    //   this.products = products;
    // })

    // we need a proxy.conf.json to get around the CORS issue (proxy.conf.json lives in the root)
    // this requires a change in angular.json in the serve node:
    // "options": {
    //   "proxyConfig": "proxy.conf.json"
    // }
    // NOTE: in this case, we should not use the async pipe on the ngFor loop in the html template
    this.http.get('/api/products')
      .subscribe(products => {
      this.products = products;
    })
  }
}
