import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../models/product/product';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor( private dataService: DataService ) {}

  ngOnInit() {
    this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((data: HttpResponse<Product[]>) => {
      console.log(data);
      data.body ? this.products = data.body : [];
    })

    // this.dataService.getProducts().subscribe((products: any[]) => {
    //   console.log(products);
    //   this.products = products;
    // })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  public firstPage() {
    this.products = [];
    // TODO modify url to include 'api/'
    // console.log("this.dataService.first = " + this.dataService.first);
    // result: http://localhost:4200/products?_page=1&_limit=20
    this.dataService.sendGetRequestToUrl(this.dataService.first.replace("products", "api/products")).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]>) => {
      console.log(res);
      res.body ? this.products = res.body : [];
    })
  }

  public previousPage() {
    if (this.dataService.prev !== undefined && this.dataService.prev !== '') {
      this.products = [];
    // TODO modify url to include 'api/'
    this.dataService.sendGetRequestToUrl(this.dataService.prev.replace("products", "api/products")).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]>) => {
        console.log(res);
        res.body ? this.products = res.body : [];
      })
    }
  }

  public nextPage() {
    if (this.dataService.next !== undefined && this.dataService.next !== '') {
      this.products = [];
    // TODO modify url to include 'api/'
    this.dataService.sendGetRequestToUrl(this.dataService.next.replace("products", "api/products")).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]>) => {
        console.log(res);
        res.body ? this.products = res.body : [];
      })
    }
  }
  public lastPage() {
    this.products = [];
    // TODO modify url to include 'api/'
    this.dataService.sendGetRequestToUrl(this.dataService.last.replace("products", "api/products")).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]>) => {
      console.log(res);
      res.body ? this.products = res.body : [];
    })
  }
}
